import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { PostComment, PostReComment } from '../Entities/Comment';

export const enum PostOrder {
	latest = "post.createAt",
}

// < Select List >
// --------------------------------------------------

const CommonCommentSelect = [
	"title",
	"writer",
]

const PostCommentSelect = [
	...CommonCommentSelect,
	"post.pk",
];

const PostReCommentSelect = [
	...CommonCommentSelect,
	"parent"
]

// < Common Repository > 
// --------------------------------------------------

class CommentRepo<T> extends Repository<T> {

}

// < Repositories > 
// --------------------------------------------------

@EntityRepository(PostComment)
export class PostCommentRepo extends CommentRepo<PostComment> { 
	
	public GetComment = ( 
		post_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) => {
		return this.createQueryBuilder("comment")
				.select( PostCommentSelect )
				.leftJoinAndSelect("comment.writer", "writer")
				.where("comment.post_pk = :post_pk", { post_pk })
				.orderBy(order_by, "DESC")
				.skip(offset)
				.take(limit)
				.getMany();
	}

}

@EntityRepository(PostReComment)
export class PostReCommentRepo extends CommentRepo<PostReComment> { 

	// @TODO : adapt limit at re-comment of re-comment
	public GetComment = ( 
		target_comment_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) => {
		return this.createQueryBuilder("comment")
				.select( PostCommentSelect )
				.leftJoinAndSelect("comment.writer", "writer")
				.where("comment.parent_pk = :target_comment_pk", { target_comment_pk })
				.orderBy(order_by, "DESC")
				.skip(offset)
				.take(limit)
				.getMany();
	}

}
