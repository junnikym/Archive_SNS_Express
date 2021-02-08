import { EntityRepository, Repository } from 'typeorm';
import { ChatMsg } from '../Entities/Chat';

@EntityRepository(ChatMsg)
export class ChatMsgRepo extends Repository<ChatMsg> {
	
	public async GetChatMsg (
		group_pk: string,
		offset: number,
		limit: number,
	) {
		return this.createQueryBuilder("chat_msg")
				.leftJoinAndSelect("chat_msg.writer", "writer")
				.where("chat_msg.group_pk = :group_pk", { group_pk })
				.orderBy("chat_msg.createdAt", "DESC")
				.skip(offset)
				.take(limit)
				.getMany();
	}

}