import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { AccountDTO } from '../Models/DTOs/AccountDTO';

import { Image } from '../Models/Entities/Image';
import { ImageDTO } from '../Models/DTOs/ImageDTO';
import { ImageRepo } from '../Models/Repositories/ImageRepo';

@Service()
export class AccountService {
	
	constructor(
		@InjectRepository() private account_repo: AccountRepo,
		@InjectRepository() private image_repo: ImageRepo
	) { }

	/**
	 * Service which creating Account
	 * 
	 * @param account_dto : Create Account DTO
	 * @param image_dto : Create Image DTO or NULL
	 */
	public async CreateAccount(
		account_dto: AccountDTO,
		image_dto: ImageDTO | null
	): Promise<Account> 
	{

		if(image_dto != null) {
			const profile_img_ent = image_dto.toEntity();
			const new_img = await this.image_repo.save(profile_img_ent);

			account_dto.profile_image = new_img;
		}

		const account_ent = account_dto.toEntity();

		return await this.account_repo.save(account_ent);
	}

	/**
	 * Update Account Data ( User Infomation )
	 * 
	 * @param account_pk : Account's PK
	 * @param account_dto : UpdateAccountDTO which is include updated aㅏccount data
	 */
	public async UpdateAccount(
		account_pk: string,
		account_dto: AccountDTO,
	): Promise<Account> 
	{
		const target = { 
			entity : await this.account_repo.findOne({ where: { pk: account_pk } })
		}

		if (target.entity?.pk === account_pk) {
			account_dto.updateEntity(target);
			return await this.account_repo.save(target.entity);
		}

		return null;
	}

	/**
	 * Get Account by PK
	 * 
	 * @param account_pk : Account's PK
	 */
	public async GetAccountByPK(
		account_pk: string
	)
	{
		return await this.account_repo.findOne({
			select: [
				"name", "email", "profile_image", "status_msg",
			],
			where: { pk: account_pk },
		});
	}

	/**
	 * Get Account by Name
	 * 
	 * @param target_name : search keyword
	 */

	public async GetAccountByName(
		target_name: string
	) {
		const [account_list, n_account] = await this.account_repo.findAndCount({
			select: [
				"pk", "name", "email", "profile_image", "status_msg"
			],
			where: { name: target_name }
		});

		return { 
			account_list : account_list, 
			n : n_account 
		};
	}

	/**
	 * Delete Account which has same PK
	 * 
	 * @param account_pk : Account's PK
	 */
	public async DeleteAccount(
		account_pk: string,
		password: string,
	): Promise<boolean>
	{
		const target = await this.account_repo.findOne({
			select: ["password"],
			where: { pk: account_pk },
		});

		if ( target ) {
			const is_pw_match = await target.check_password (password);

			if(is_pw_match) {
				await this.account_repo.delete({ pk: account_pk });
				return true;
			}
		}
		
		return false;
	}
}