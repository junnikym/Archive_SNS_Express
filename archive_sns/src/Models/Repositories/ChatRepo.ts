import { EntityRepository, Repository } from 'typeorm';
import { ChatMsg, ChatNotify } from '../Entities/Chat';
import { ChatGroup } from '../Entities/Group';

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

@EntityRepository(ChatNotify)
export class ChatNotifyRepo extends Repository<ChatNotify> {

	public async CreateNew(entities: ChatNotify[]) {
		
		const result = await this.save(entities);

		return this.createQueryBuilder("chat_notify")
			.leftJoinAndSelect("chat_notify.chat", "chat")
			// .leftJoinAndSelect("chat_notify.chat.writer", "writer")
			.leftJoinAndSelect("chat_notify.listener", "listener")
			.where("chat_notify.pk IN (:...pks)", { pks: result.map(e=>e.pk) })
			.getMany();
	}
	
	public async GetChatNotify (
		account_pk: string
	) {
		return this.createQueryBuilder("chat_notify")
				.leftJoinAndSelect("chat_notify.chat", "chat")
				.where("chat_notify.listener_pk = :account_pk", {account_pk})
				.orderBy("chat.createdAt", "DESC")
				.getMany();
	}

	public async CheckChatNotify(
		account_pk: string,
		notify_pk: string
	) {
		const target_notify = await this.createQueryBuilder("chat_notify")
				.leftJoinAndSelect("chat_notify.chat", "chat")
				.where("chat_notify.pk = :notify_pk", {notify_pk})
				.getOne();

		return await this.createQueryBuilder("chat_notify").delete()
				// .leftJoinAndSelect("chat_notify.chat", "chat")
				.where("chat_notify.listener_pk = :account_pk", {account_pk})
				.where("chat_notify.chat.group_pk = :group_pk", {group_pk: target_notify.chat.group_pk})
				.execute();
	}

}