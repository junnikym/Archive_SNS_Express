import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Account } from "../Entities/Account";
import { Image } from "../Entities/Image";
import { profile } from 'console';
import { Friend } from '../Entities/Friend';

/**
 * Length constants
 */

const MIN_PW_LEN = 1;
const MAX_PW_LEN = 64;

const MIN_EMAIL_LEN = 1;
const MAX_EMAIL_LEN = 64;

const MIN_NAME_LEN = 1;
const MAX_NAME_LEN = 64;

export class FriendDTO {

	@IsNotEmpty()
	public account_pk: string;

	@IsNotEmpty()
	public friend_pk: string;

	public toEntity(): Friend {
		const {account_pk, friend_pk} = this;
		
		const new_friend = new Friend();
		new_friend.account_pk = account_pk;
		new_friend.friend_pk = friend_pk;

		return new_friend;
	}
}
