import {
	EntityRepository, Repository
} from "typeorm";

import { Friend, FriendNotify } from '../Entities/Friend';

@EntityRepository(Friend)
export class FriendRepo extends Repository<Friend> {
	
	public async GetFriendList( account_pk: string ): Promise<Friend[]> {
		
		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.friend", "account")
			.where("friend.account_pk =: account_pk", {account_pk})
			.andWhere("friend.accept =: value", { value: true })
			.getMany();

	}

	public async GetSendList( account_pk: string ): Promise<Friend[]> {

		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.friend", "account")
			.where("friend.account_pk =: account_pk", {account_pk})
			.andWhere("friend.accept =: value", { value: false })
			.getMany();

	}

	public async GetReceiveList( account_pk: string ): Promise<Friend[]> {

		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.account", "account")
			.where("friend.friend_pk =: account_pk", {account_pk})
			.andWhere("friend.accept =: value", { value: false })
			.getMany();

	}

}

@EntityRepository(FriendNotify)
export class FriendNotifyRepo extends Repository<FriendNotify> {

	public async CreateNew(entities: FriendNotify) {
		
		const result = await this.save(entities);

		return this.createQueryBuilder("friend_notify")
			.leftJoinAndSelect("friend_notify.friendship", "friendship")
			.leftJoinAndSelect("friend_notify.listener", "listener")
			.where("friend_notify.pk IN (:pks)", { pks: result + ".pk" })
			.getMany();
	}

}