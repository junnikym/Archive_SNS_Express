import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Account } from "../Entities/Account";

export class CreateAccount {

	/**
	 * DAO for Create Account
	 */

	@IsNotEmpty()
	@Length(4, 64)
	id: string;

	@IsNotEmpty()
	@Length(8, 64)
	public password: string;

	@IsNotEmpty()
	@Length(1, 100)
	@IsEmail()
	public email: string;

	@IsNotEmpty()
	@Length(1, 50)
	public name: string;

	public toEntity(): Account {
		const { id, password, email, name } = this;

		const newAccount = new Account();
		newAccount.name = name;
		newAccount.email = email;
		newAccount.password = password;

		return newAccount;
	}

}
