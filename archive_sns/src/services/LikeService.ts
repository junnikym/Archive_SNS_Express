import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection, Like } from "typeorm";

import { CommentLike, PostLike } from '../Models/Entities/Like';
import { CommentLikeRepo, PostLikeRepo } from '../Models/Repositories/LikeRepo';
import { ImageRepo } from '../Models/Repositories/ImageRepo';
import { post } from 'request';
import { PostRepo } from "../Models/Repositories/PostRepo";
import { CommentRepo } from "../Models/Repositories/CommentRepo";
import { Post } from '../Models/Entities/Post';
import { Comment } from '../Models/Entities/Comment';

class CommonLikeService<
	RepoType extends (PostLikeRepo | CommentLikeRepo),
	EntType extends (PostLike | CommentLike)
> {
	@InjectRepository() protected like_repo;
	@InjectRepository() protected target_repo;

	constructor(like_repo: RepoType, target_repo: any) {
		this.like_repo = like_repo;
		this.target_repo = target_repo;
	}

	/**
	 * Check is exist like row which satisfying condition
	 * 
	 * @param giver_pk : giver pk
	 * @param target_pk : target pk
	 */
	public async IsLike(
		giver_pk : string,
		target_pk : string
	) : Promise<boolean> {
		const old_like = this.like_repo.GetLike(giver_pk, target_pk);
		return old_like ? true : false;
	}

	/**
	 * count like number
	 * 
	 * @param target_pk : target PK
	 */
	public async CountLike(
		target_pk : string
	) : Promise<number> {
		return this.like_repo.GetCount(target_pk);
	}

	/**
	 * the list of people who like the target(post, comment ...) things
	 * 
	 * @param target_pk : target PK
	 * @param limit : list limit number
	 */
	public async WhoLike(
		target_pk : string,
		limit : number
	) : Promise<number> {
		return this.like_repo.GetWho(target_pk, limit);
	}

	/**
	 * Like Toggle
	 * 
	 * if giver gave the like before, service will delete which like row
	 * if not, it will create like row
	 * 
	 * @param giver_pk : giver pk
	 * @param post_pk : post pk
	 */
	public async ToggleLike(
		giver_pk : string,
		target_pk : string
	) {
		// Get Target Post
		const target = await this.target_repo.findOne(target_pk);

		if(!target)
			return undefined;

		// Find like row which satisfying condition
		const old_like = this.like_repo.GetLike(giver_pk, target_pk);

		// ( OFF ) If exist row => Delete it 
		if(old_like) 
			this.like_repo.delete({ pk: old_like.pk});

		// ( ON ) If not exist => Make new one
		else 
			await this.like_repo.CreateLike(giver_pk, target_pk);

		// Save n_like at Target
		target.n_like = await this.like_repo.GetCount(target_pk);
		return await this.target_repo.save(target)
	}



}

@Service()
export class PostLikeService extends CommonLikeService<PostLikeRepo, PostLike>{

	constructor() {
		super( 
			getConnection().getCustomRepository(PostLikeRepo), 
			getConnection().getCustomRepository(PostRepo) 
		);
	}
	
}

@Service()
export class CommentLikeService extends CommonLikeService<CommentLikeRepo, CommentLike>{

	constructor() {
		super( 
			getConnection().getCustomRepository(CommentLikeRepo), 
			getConnection().getCustomRepository(PostRepo)
		);
	}
	
}