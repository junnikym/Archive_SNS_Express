import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { CreateAccountDTO } from '../Models/DTOs/AccountDTO';

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

	public async Login() {

	}
}