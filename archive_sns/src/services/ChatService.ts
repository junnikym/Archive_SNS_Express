import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../Models/Entities/Account';
import { ChatGroup, ChatMsg } from '../Models/Entities/Chat';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { ChatGroupRepo, ChatMsgRepo } from '../Models/Repositories/ChatRepo';
import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';
import { group } from 'console';

@Service()
export class ChatService {

	private conn = getConnection();

	@InjectRepository() 
	private chat_group_repo: ChatGroupRepo = this.conn.getCustomRepository(ChatGroupRepo);

	@InjectRepository()
	private account_repo: AccountRepo = this.conn.getCustomRepository(AccountRepo);
	
	@InjectRepository()
	private chat_msg_repo: ChatMsgRepo = this.conn.getCustomRepository(ChatMsgRepo)

	public async CreateChatGroup(
		people_pk_list: string[],
	) : Promise<ChatGroup> 
	{
		if(people_pk_list.length < 2)
			return undefined;

		const people: Account[] = await this.account_repo.FindByPKs(people_pk_list);
		
		if(people) {
			const new_group = new ChatGroup()
			new_group.participant = people;

			return await this.chat_group_repo.save(new_group);
		}

		return undefined;
	}

	public async SendMsg(
		account_pk: string,
		group_pk: string,
		chat_msg_dto: ChatMsgDTO
	) : Promise<ChatMsg> {
		const new_chat_msg = await chat_msg_dto.toEntity();
		new_chat_msg.writer_pk = account_pk;
		new_chat_msg.group_pk = account_pk;

		return await this.chat_msg_repo.save(new_chat_msg);
	}

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
