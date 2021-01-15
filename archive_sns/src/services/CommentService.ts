import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { PostComment } from '../Models/Entities/Comment';
import { PostCommentRepo } from '../Models/Repositories/CommentRepo';
import { CreateCommentDTO, UpdateCommentDTO } from '../Models/DTOs/CommentDTO';

enum SortBy {
	Date = 0
}

@Service()
export class PostCommentService {
	private conn = getConnection();

	@InjectRepository(PostComment) 
	private post_comment_repo: PostCommentRepo = 
		this.conn.getRepository(PostComment);

	public async CreatePostComment(
		writer_pk : string,
		post : string,
		create_comment_dto : CreateCommentDTO,
	) : Promise<PostComment> {
		const comment_ent = create_comment_dto.toEntity() as PostComment;
		comment_ent.writer_pk 	= writer_pk;
		comment_ent.post_pk 	= post;
		
		return await this.post_comment_repo.save(comment_ent);
	}

	// public async GetPostComment(
	// 	post_pk: string,
	// 	unit: number,
	// 	sort: SortBy
	// ) {
		
	// }

	public async UpdatePostComment(
		writer_pk : string,
		comment_pk: string,
		update_commnet_dto : UpdateCommentDTO,
	)  {
		const target = {
			entity: await this.post_comment_repo.findOne(
				{ where: {pk: comment_pk}}
			)
		}
		
		if( target?.entity.writer_pk === writer_pk ) {
			update_commnet_dto.updateEntity(target);
			return target.entity;
		}
		
		return null;
	}

	public async DeletePostComment(
		writer_pk : string,
		comment_pk : string
	): Promise<boolean> 
	{
		const target = await this.post_comment_repo.findOne({ 
			where: {pk: comment_pk}
		});

		if( target?.writer_pk === writer_pk ) {
			await this.post_comment_repo.delete(target);
			return true;
		}

		return false;
	}

}
