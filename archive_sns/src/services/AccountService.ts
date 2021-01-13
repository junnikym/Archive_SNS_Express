import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { CreateAccountDTO, UpdateAccountDTO } from '../Models/DTOs/AccountDTO';

import { Image } from '../Models/Entities/Image';
import { CreateImageDTO } from '../Models/DTOs/ImageDTO';
import { ImageRepo } from '../Models/Repositories/ImageRepo';

@Service()
export class AccountService {
	private conn = getConnection();
	
	@InjectRepository(Account) 
	private account_repo: AccountRepo = this.conn.getRepository(Account);

	@InjectRepository(Image) 
	private image_repo: ImageRepo = this.conn.getRepository(Image);

	/**
	 * Service which creating Account
	 * 
	 * @param account_dto : Create Account DTO
	 * @param image_dto : Create Image DTO or NULL
	 */
	public async CreateAccount(
		account_dto: CreateAccountDTO,
		image_dto: CreateImageDTO | null
	): Promise<Account> 
	{
		//@TODO : NEED TO TRANSECTION !!!

		if(image_dto != null) {
			const profile_image = image_dto.toEntity();
			const new_img = await this.image_repo.save(profile_image);

			account_dto.profile_image = new_img;
		}

		const account = account_dto.toEntity();
		const new_account = await this.account_repo.save(account);

		return new_account;
	}

	/**
	 * Update Account Data ( User Infomation )
	 * 
	 * @param account_pk : Account's PK
	 * @param update_account_dto : UpdateAccountDTO which is include updated account data
	 */
	public async UpdateAccount(
		account_pk: string,
		updateUserDto: UpdateAccountDTO,
	): Promise<Account> 
	{

		const target = { 
			entity : await this.account_repo.findOne({ where: { pk: account_pk } })
		}

		if (target.entity?.pk === account_pk) {
			updateUserDto.updateEntity(target);
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
	): Promise<Account>
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

		return [account_list, n_account];
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