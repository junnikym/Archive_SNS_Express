import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Post } from '../Models/Entities/Post';
import { PostRepo } from '../Models/Repositories/PostRepo';
import { CreatePostDTO, UpdateEntityDTO } from '../Models/DTOs/PostDTO';

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';

import { PostImage } from '../Models/Entities/Image';
import { PostImageRepo } from '../Models/Repositories/ImageRepo';
import { CreateImageDTO } from '../Models/DTOs/ImageDTO';
import { async } from '../db_connection';

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
		image_dto_list: CreateImageDTO[] | null
	): Promise<Post> 
	{
		// Create Post

		const post_ent = post_dto.toEntity();
		post_ent.writer_pk = writer_pk;

		const new_post = await this.post_repo.save(post_ent);
		
		// Create Images

		if(image_dto_list != null) {

			image_dto_list.forEach( async (img_dto) => {
				
				const img_ent = img_dto.toEntity() as PostImage;
				img_ent.post = new_post;

				await this.post_image_repo.save(img_ent);
			});
		}

		return new_post;
	}

	public async UpdatePost(
		writer_pk: string,
		post_pk: string,
		post_dto: UpdateEntityDTO | null,
		new_img_dto: CreateImageDTO[] | null,
		del_img_list: string[] | null,
	): Promise<Post | null> {

		const target = {
			entity: await this.post_repo.findOne({ where: {pk: Account} })
		}

		if(target.entity.writer_pk === writer_pk ) {
			post_dto?.UpdateEntity(target);
			
			del_img_list?.forEach( elem => {
				this.post_image_repo.delete({ pk: elem });
			});

			new_img_dto?.forEach(elem => {
				const img_ent = elem.toEntity() as PostImage;
				img_ent.post = target.entity;

				this.post_image_repo.save(img_ent);
			});

			return target.entity;
		}

		return null;
	}

	public async DeletePost(
		writer_pk: string,
		post_pk: string
	) {
		const target = await this.post_repo.findOne({ where: {pk: Account} });

		if( target.writer_pk === writer_pk ) {
			this.post_repo.delete(target);
			return true;
		}

		return false;
	}


}