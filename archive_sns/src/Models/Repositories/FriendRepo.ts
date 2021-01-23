import {
	EntityRepository, Repository
} from "typeorm";

import { Friend } from '../Entities/Friend';

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