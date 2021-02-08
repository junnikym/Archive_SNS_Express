import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Post } from '../Models/Entities/Post';
import { PostRepo, PostOrder } from '../Models/Repositories/PostRepo';
import { PostDTO } from '../Models/DTOs/PostDTO';

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';

import { ImageDTO } from '../Models/DTOs/ImageDTO';

import { PostImageRepo } from '../Models/Repositories/ImageRepo';
import { PostImage } from "../Models/Entities/Image";

class ImageService <
	RepoType extends (PostImageRepo),
	EntType extends (PostImage)
> {
	protected image_repo;

	constructor(
		image_repo: RepoType
	) {
		this.image_repo = image_repo;
	}

	public async UpdatePost(
		uploader_pk: string,
		img_dto: ImageDTO
	): Promise<EntType | null> 
	{
		console.log("it running... ")

		const new_img = img_dto.toEntity() as EntType;

		new_img.uploader_pk = uploader_pk;

		console.log(new_img);

		return await this.image_repo.save(new_img);
	}

}

@Service()
export class PostImageService extends ImageService< PostImageRepo, PostImage> {

	constructor(
		@InjectRepository() image_repo: PostImageRepo
	) {
		super(image_repo);
	}

}