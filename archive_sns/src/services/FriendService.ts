import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { FriendRepo } from "../Models/Repositories/FriendRepo";
import { FriendDTO } from '../Models/DTOs/FriendDTO';
import { Friend } from '../Models/Entities/Friend';

@Service()
export class FriendService {

	constructor (
		@InjectRepository() private friend_repo: FriendRepo
	) { }

	/**
	 * Add friend 
	 * 
	 * @param friend_dto : Friend DTO
	 */
	public async AddFriend(
		friend_dto: FriendDTO
	): Promise<Friend> 
	{
		return await this.friend_repo.save( friend_dto.toEntity() );
	}

	/**
	 * Get user's friend list
	 * 
	 * @param account_pk Account PK
	 */
	public async GetFriendList( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.GetFriendList( account_pk );
	}

	/**
	 * Get list of requests which is not accepted yet
	 * 
	 * @param account_pk Account PK
	 */
	public async GetSendList( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.GetSendList( account_pk );
	}

	/**
	 * Get list of requests which is other user sent to me, for be friend
	 * 
	 * @param account_pk Account PK
	 */
	public async GetReceiveList( account_pk: string ): Promise<Friend[]> {

		return await this.friend_repo.GetReceiveList( account_pk );
	}

	/**
	 * Accept friend request
	 * 
	 * @param account_pk : account PK ( who accept )
	 * @param request_pk : Friend Entity which created on request
	 */
	public async AcceptFriend(
		account_pk: string,
		request_pk: string
	): Promise<Friend> 
	{
		const request_ent = 
			await this.friend_repo.findOne({ where: { pk: request_pk } });

		if(account_pk === request_ent.friend_pk) {

			request_ent.accept = true;
			await this.friend_repo.save( request_ent );

			const new_friend = new Friend;
			new_friend.account_pk 	= account_pk;
			new_friend.friend_pk	= request_ent.account_pk;
			new_friend.accept		= true;

			return await this.friend_repo.save( new_friend );	

		}

		return undefined;
	}

	/**
	 * Reject friend request
	 * 
	 * @param account_pk Account PK
	 * @param requst_pk Request Friend Entity PK
	 */
	public async RejectFriend(
		account_pk: string,
		requst_pk: string
	): Promise<boolean>
	{
		const request_ent = 
			await this.friend_repo.findOne({ where: { pk: requst_pk } });

		if(account_pk === request_ent.friend_pk) {
			await this.friend_repo.delete({ pk: requst_pk });
			return true;
		}

		return false;
	}

	/**
	 * Delete Friend from list
	 * 
	 * @param account_pk account PK
	 * @param friend_pk friend's acocunt PK
	 */
	public async DeleteFriend(
		account_pk: string,
		friend_pk: string
	): Promise<boolean> 
	{
		let del_count = 0;

		const user_side = await this.friend_repo.findOne({
			where: { account_pk : account_pk, friend_pk : friend_pk }
		});

		// @TODO : Make alarm
		const friend_side = await this.friend_repo.findOne({
			where: { account_pk : friend_pk, friend_pk : account_pk }
		});

		if(user_side) {
			await this.friend_repo.delete({ pk: user_side.pk });
			del_count++;
		}

		if(friend_side) {
			await this.friend_repo.delete({ pk: friend_side.pk });
			del_count++;
		}

		return (del_count != 0);
	}

}