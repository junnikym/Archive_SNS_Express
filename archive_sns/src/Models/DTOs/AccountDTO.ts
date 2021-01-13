import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Account } from "../Entities/Account";

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

	public toEntity(): Account {
		const { password, email, name } = this;

		const newAccount = new Account();
		newAccount.name = name;
		newAccount.email = email;
		newAccount.password = password;

		return newAccount;
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