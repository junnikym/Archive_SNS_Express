import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Post } from '../Models/Entities/Post';
import { PostRepo } from '../Models/Repositories/PostRepo';
import { CreatePostDTO } from '../Models/DTOs/PostDTO';

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { CreateAccountDTO, UpdateAccountDTO } from '../Models/DTOs/AccountDTO';

import { PostImage } from '../Models/Entities/Image';
import { CreateImageDTO } from '../Models/DTOs/ImageDTO';
import { PostImageRepo } from '../Models/Repositories/ImageRepo';

@Service()
export class PostService {
	private conn = getConnection();

	@InjectRepository(Post) 
	private post_repo: PostRepo = this.conn.getRepository(Post);

	@InjectRepository(PostImage) 
	private post_image_repo: PostImageRepo = this.conn.getRepository(PostImage);

	
	public async CreatePost(
		writer_pk: string,
		post_dto: CreatePostDTO,
		image_dto_arr: CreateImageDTO[] | null
	): Promise<Post> 
	{
		// Create Post

		const post_ent = post_dto.toEntity();
		post_ent.writer_pk = writer_pk;

		const new_post = await this.post_repo.save(post_ent);
		
		// Create Images

		if(image_dto_arr != null) {

			image_dto_arr.forEach( async (img_dto) => {
				
				const img_ent = img_dto.toEntity() as PostImage;
				img_ent.post = new_post;

				await this.post_image_repo.save(img_ent);
			});
		}

		return new_post;
	}

}