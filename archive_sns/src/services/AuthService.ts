import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { LoginAccountDTO } from '../Models/DTOs/AccountDTO';

@Service()
export class AuthService {

	private conn = getConnection();

	@InjectRepository(Account) 
	private account_repo: AccountRepo = this.conn.getRepository(Account);

	/**
	 * Verify that the data passed to DTO and the data which exist in 
	 * the Database are correct
	 * 
	 * @param login_account_dto : Login Account DTO
	 * 
	 * @returns Account Data ( fail : undefined ) 
	 */
	public async validateAccount(
		login_account_dto: LoginAccountDTO 
	): Promise<Account> 
	{
		const account = await this.account_repo.findOne({
			select: ["email", "password", "name"],
			where: { email: login_account_dto.email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.check_password (login_account_dto.password);

			if (is_pw_match) 
				return account;
		}

		return undefined;
	}
}