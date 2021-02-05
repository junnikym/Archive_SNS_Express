import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { ChatGroupRepo } from '../Models/Repositories/GroupRepo';
import { ChatMsgRepo } from '../Models/Repositories/ChatRepo';

import { Account } from '../Models/Entities/Account';
import { ChatGroup } from '../Models/Entities/Group';
import { ChatMsg } from '../Models/Entities/Chat';

import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';

@Service()
export class ChatService {

	constructor(
		@InjectRepository() private chat_group_repo: ChatGroupRepo,
		@InjectRepository() private account_repo: AccountRepo,
		@InjectRepository() private chat_msg_repo: ChatMsgRepo
	) {}

	// public async SendMsg(
	// 	account_pk: string,
	// 	group_pk: string,
	// 	chat_msg_dto: ChatMsgDTO
	// ) : Promise<ChatMsg> {
	// 	const new_chat_msg = await chat_msg_dto.toEntity();
	// 	new_chat_msg.writer_pk = account_pk;
	// 	new_chat_msg.group_pk = account_pk;

	// 	return await this.chat_msg_repo.save(new_chat_msg);
	// }

	public async ExitChatGroup(
		account_pk: string,
		group_pk: string,
	) : Promise<ChatGroup> {

		const target_group = await this.chat_group_repo.findOne({ where: {pk: group_pk} });
		target_group.participant = target_group.participant.filter( elem => {
			elem.pk !== account_pk
		});

		return await this.chat_group_repo.save(target_group);
	}

}
