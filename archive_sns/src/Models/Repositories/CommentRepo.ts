import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Comment, PostComment, PostReComment } from '../Entities/Comment';

export const enum PostOrder {
	latest = "post.createAt",
}

// < Select List >
// --------------------------------------------------

const CommonCommentSelect = [
	"pk",
	"title",
	"writer",
]

const PostCommentSelect = [
	...CommonCommentSelect,
	"post_pk",
];

const PostReCommentSelect = [
	...CommonCommentSelect,
	"parent_pk",
]

// < Common Repository > 
// --------------------------------------------------

class CommonCommentRepo<T> extends Repository<T> {

}

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
export class PostReCommentRepo extends CommonCommentRepo<PostReComment> { 

	public async GetComment ( 
		target_comment_pk: string,
		offset: number, 
		limit: number, 
		order_by: string 
	) {
		return this.createQueryBuilder("comment")
				.select( PostCommentSelect )
				.leftJoinAndSelect("comment.writer", "writer")
				.where("comment.root_pk = :target_comment_pk", { target_comment_pk })
				.orderBy(order_by, "DESC")
				.skip(offset)
				.take(limit)
				.getMany();

	}

}
