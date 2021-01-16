import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection, Like } from "typeorm";

import { PostLike } from '../Models/Entities/Like';
import { PostLikeRepo } from '../Models/Repositories/LikeRepo';
import { ImageRepo } from '../Models/Repositories/ImageRepo';

@Service()
export class PostLikeService {
	private conn = getConnection();

	@InjectRepository(PostLike)
	private post_like_repo: PostLikeRepo = this.conn.getRepository(PostLike);

	/**
	 * Like Toggle which for Post
	 * if giver gave the like before, service will delete row
	 * if not, it will create row
	 * 
	 * @param giver : Giver Account PK
	 * @param post : Post's PK
	 */
	public async ToggleLike(
		giver : string,
		post : string
	) {
		const target = await this.post_like_repo.findOne({ 
			where: {post_pk: post, giver_pk: giver} 
		});

		// ( OFF ) If exist row => Delete it
		if(target) {
			console.log("find target");
			this.post_like_repo.delete({ pk: target.pk});
			return null;
		}

		// ( ON ) If not exist => Make new one
		const new_like = new PostLike;
		new_like.giver_pk = giver;
		new_like.post_pk = post;

		return await this.post_like_repo.save(new_like);
	}
}