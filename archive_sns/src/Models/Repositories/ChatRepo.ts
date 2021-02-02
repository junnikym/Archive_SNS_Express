import { EntityRepository, Repository } from 'typeorm';
import { ChatGroup, ChatMsg } from '../Entities/Chat';

@EntityRepository(ChatMsg)
export class ChatMsgRepo extends Repository<ChatMsg> {}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends Repository<ChatGroup> {

	public async Exit(account_pk: string) {
		
	}

}
