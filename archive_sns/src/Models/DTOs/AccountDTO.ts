import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Account } from "../Entities/Account";
import { Image } from "../Entities/Image";

/**
 * Length constants
 */

const MIN_PW_LEN = 1;
const MAX_PW_LEN = 64;

const MIN_EMAIL_LEN = 1;
const MAX_EMAIL_LEN = 64;

const MIN_NAME_LEN = 1;
const MAX_NAME_LEN = 64;

export class CreateAccountDTO {

	/**
	 * DTO for Create Account
	 */

	@IsNotEmpty()
	@Length(MIN_EMAIL_LEN, MAX_EMAIL_LEN)
	@IsEmail()
	public email: string;

	@IsNotEmpty()
	@Length(MIN_PW_LEN, MAX_PW_LEN)
	public password: string;

	@IsNotEmpty()
	@Length(MIN_NAME_LEN, MAX_NAME_LEN)
	public name: string;

	public profile_image: Image | null;

	public status_msg: string | null;

	public toEntity(): Account {
		const { 
			password, 
			email, 
			name, 
			profile_image, 
			status_msg
		} = this;

		const newAccount = new Account();
		newAccount.name = name;
		newAccount.email = email;
		newAccount.password = password;
		newAccount.profile_image = profile_image;
		newAccount.status_msg = status_msg;

		return newAccount;
	}

}

export class UpdateAccountDTO {
	@Length(MIN_PW_LEN, MAX_PW_LEN)
	public password: string | null;

	@Length(MIN_NAME_LEN, MAX_NAME_LEN)
	public name: string | null;

	public profile_image: Image | null;

	public status_msg: string | null;

	public updateEntity( target: { entity: Account } ) {
		const { 
			password,
			name, 
			profile_image, 
			status_msg
		} = this;

		if(password) 
			target.entity.password = password;
		
		if(name) 
			target.entity.name = name;
		
		if(profile_image)
			target.entity.profile_image = profile_image;

		if(status_msg)
			target.entity.status_msg = target.entity.status_msg;
	}
}

export class LoginAccountDTO {

	/**
	 * DTO for Login Account
	 */

	@IsNotEmpty()
	@Length(MIN_EMAIL_LEN, MAX_EMAIL_LEN)
	@IsEmail()
	public email: string;

	// Only To Compare
	@IsNotEmpty()
	@Length(MIN_PW_LEN, MAX_PW_LEN)
	public password: string;
}