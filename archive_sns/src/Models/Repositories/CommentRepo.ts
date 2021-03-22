import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Comment, PostComment, PostReComment, CommentNotify } from '../Entities/Comment';

export const enum PostOrder {
	latest = "post.createAt",
}

// < Select List >
// --------------------------------------------------

// const CommonCommentSelect = [
// 	// "pk",
// 	// "writer",
// ]

// const PostCommentSelect = [
// 	"pk"
// 	// ...CommonCommentSelect,
// 	// "post",
// ];

// const PostReCommentSelect = [
// 	...CommonCommentSelect,
// 	"parent",
// ]

// < Common Repository > 
// --------------------------------------------------

class CommonCommentRepo<T> extends Repository<T> {}

// < Repositories > 
// --------------------------------------------------

@EntityRepository(Comment)
export class CommentRepo extends CommonCommentRepo<Comment> { }


@EntityRepository(PostComment)
export class PostCommentRepo extends CommonCommentRepo<PostComment> { 
	
	public async GetComment ( 
		post_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
				.leftJoinAndSelect("comment.writer", "writer")
				.where("comment.post_pk = :post_pk", { post_pk: post_pk })
				.orderBy(order_by, "DESC")
				.skip(offset)
				.take(limit)
				.getMany();
	}

}

@EntityRepository(PostReComment)
export class PostReCommentRepo extends CommonCommentRepo<PostReComment> { 

	public async GetComment ( 
		target_comment_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
				// .select( PostCommentSelect )
				.leftJoinAndSelect("comment.writer", "writer")
				.where("comment.root_pk = :target_comment_pk", { target_comment_pk })
				.orderBy(order_by, "DESC")
				.skip(offset)
				.take(limit)
				.getMany();
	}

}

@EntityRepository(CommentNotify)
export class CommentNotifyRepo extends Repository<CommentNotify> {

	public async CreateNew(entities: CommentNotify[]) {

		const result = await this.save(entities);

		return this.createQueryBuilder("comment_notify")
			.leftJoinAndSelect("comment_notify.comment", "comment")
			.leftJoinAndSelect("comment_notify.listener", "listener")
			.where("comment_notify.pk IN (:...pks)", { pks: result.map(e=>e.pk) })
			.getMany();
	}
	
	public async GetCommentNotify (
		account_pk: string
	) {
		return this.createQueryBuilder("comment_notify")
				.leftJoinAndSelect("comment_notify.comment", "comment")
				.where("comment_notify.listener_pk = :account_pk", {account_pk})
				.orderBy("comment.createdAt", "DESC")
				.getMany();
	}

	public async CheckCommentNotify(
		account_pk: string,
		notify_pk: string
	) {
		const target_notify = await this.createQueryBuilder("comment_notify")
				.leftJoinAndSelect("comment_notify.comment", "comment")
				.where("comment_notify.pk = :notify_pk", {notify_pk})
				.getOne();

		return await this.createQueryBuilder("comment_notify").delete()
				.where("comment_notify.listener_pk = :account_pk", {account_pk})
				.where("comment_notify.comment.pk = :pk", {group_pk: target_notify.comment.pk})
				.execute();
	}

}
