import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { CreateAccountDTO } from '../Models/DTOs/AccountDTO';

import { Image, ProfileImage } from '../Models/Entities/Image';
import { CreateImageDTO } from '../Models/DTOs/ImageDTO';
import { ImageRepo, ProfileImageRepo } from '../Models/Repositories/ImageRepo';
import { getConnection } from "typeorm";

@Service()
export class AccountService {
	private conn = getConnection();
	
	@InjectRepository(Account) 
	private account_repo: AccountRepo = this.conn.getRepository(Account);

	@InjectRepository(Image) 
	private image_repo: ImageRepo = this.conn.getRepository(Image);

	@InjectRepository(ProfileImage)
	private profile_img_repo: ProfileImageRepo = this.conn.getRepository(ProfileImage);


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
		
		const account = account_dto.toEntity();

		console.log(account_dto);

		const new_account = await this.account_repo.save(account);

		if(image_dto != null) {
			const profile_image = image_dto.toEntity();
			const new_img = await this.image_repo.save(profile_image);
			
			const profile_img = new ProfileImage();
			profile_img.account = new_account;
			profile_img.image = new_img;

			this.profile_img_repo.save(profile_image);
		}

		return new_account;
	}
}