import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { PostComment, PostReComment } from '../Models/Entities/Comment';
import { PostCommentRepo, PostReCommentRepo } from '../Models/Repositories/CommentRepo';
import { CommentDTO } from '../Models/DTOs/CommentDTO';

enum SortBy {
	Date = 0
}

class CommentService<
	RepoType extends (PostCommentRepo | PostReCommentRepo),
	EntType extends (PostComment | PostReComment)
> {
	protected comment_repo;

	constructor(
		comment_repo: RepoType
	) {
		this.comment_repo = comment_repo;
	}

	/**
	 * Update Comment Service
	 * 
	 * @param writer_pk : writer's PK
	 * @param comment_pk : comment's PK
	 * @param comment_dto : Update comment DTO
	 */
	public async UpdateComment(
		writer_pk : string,
		comment_pk: string,
		comment_dto : CommentDTO,
	) : Promise<EntType> 
	{
		const test = new PostCommentRepo;
		test.findOne()

		const target = {
			entity: await this.comment_repo.findOne(
				{ where: {pk: comment_pk}}
			)
		}
		
		if( target.entity?.writer_pk === writer_pk ) {
			comment_dto.updateEntity(target);
			await this.comment_repo.save(target.entity);
			return target.entity;
		}
		
		return null;
	}

	/**
	 * Delete Post Service
	 * 
	 * @param writer_pk : Writer's PK
	 * @param comment_pk : Comment's PK
	 */
	public async DeleteComment(
		writer_pk : string,
		comment_pk : string
	): Promise<boolean> 
	{
		const target = await this.comment_repo.findOne({ 
			where: {pk: comment_pk}
		});

		if( target?.writer_pk === writer_pk ) {
			await this.comment_repo.delete(target);
			return true;
		}

		return false;
	}
}

@Service()
export class PostCommentService extends CommentService< PostCommentRepo, PostComment> {

	constructor(
		@InjectRepository() comment_repo : PostCommentRepo
	) {
		super(comment_repo);
	}

	/**
	 * Create Comment Service
	 * 
	 * @param writer_pk : Writer's PK
	 * @param post_pk : post's PK which want to post a comment
	 * @param comment_dto : Create comment DTO
	 */
	public async CreateComment(
		writer_pk : string,
		post_pk : string,
		comment_dto : CommentDTO
	) : Promise<PostComment> {
		const comment_ent : PostComment = 
			comment_dto.toEntity() as PostComment;
		
		comment_ent.writer_pk 	= writer_pk;
		comment_ent.post_pk 	= post_pk;
		
		return await this.comment_repo.save(comment_ent);
	}

	public async GetPostComment(
		post_pk: string,
		offset: number,
		limit: number,
		order_by: string
	) {
		return await this.comment_repo
			.GetComment(post_pk, offset, limit, order_by);
	}

}
