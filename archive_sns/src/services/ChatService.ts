import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { ChatGroupRepo } from '../Models/Repositories/GroupRepo';
import { ChatMsgRepo, ChatNotifyRepo } from '../Models/Repositories/ChatRepo';

import { Account } from '../Models/Entities/Account';
import { ChatGroup } from '../Models/Entities/Group';
import { ChatMsg, ChatNotify } from '../Models/Entities/Chat';

import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';

@Service()
export class ChatService {

	constructor(
		@InjectRepository() private chat_group_repo: ChatGroupRepo,
		@InjectRepository() private account_repo: AccountRepo,
		@InjectRepository() private chat_msg_repo: ChatMsgRepo,
		@InjectRepository() private chat_notify_repo: ChatNotifyRepo
	) {}

	public async SendMsg(
		account_pk: string,
		group_pk: string,
		chat_msg_dto: ChatMsgDTO
	) : Promise<ChatMsg> 
	{
		const new_chat_msg = await chat_msg_dto.toEntity();
		new_chat_msg.writer_pk = account_pk;
		new_chat_msg.group_pk = group_pk;

		const result = await this.chat_msg_repo.save(new_chat_msg);
		const group = await this.chat_group_repo.getParticipant(result.group_pk);

		const notify = [];
		group.participant.map( async elem => {
			await this.chat_notify_repo.InsertChatNotify(elem.pk, result.pk);
		});

		return result;
	}

	public async ExitChatGroup(
		account_pk: string,
		group_pk: string,
	) : Promise<ChatGroup> 
	{
		const target_group = await this.chat_group_repo.findOne({ where: {pk: group_pk} });
		target_group.participant = target_group.participant.filter( elem => {
			elem.pk !== account_pk
		});

		return await this.chat_group_repo.save(target_group);
	}

	public async GetChatList(
		group_pk: string,
		offset: number, 
		limit: number,
	): Promise<ChatMsg[]> 
	{
		return await this.chat_msg_repo.GetChatMsg(group_pk, offset, limit);
	}

	public async GetChatNotify(
		account_pk: string
	): Promise<ChatNotify[]>
	{
		return await this.chat_notify_repo.GetChatNotify(account_pk);
	}

	public async CheckChatNotify(
		account_pk: string,
		notify_pk: string
	): Promise<boolean>
	{
		const result = 
			await this.chat_notify_repo.CheckChatNotify(account_pk, notify_pk);

		if(result) 
			return true;

		return false;
	}
}
