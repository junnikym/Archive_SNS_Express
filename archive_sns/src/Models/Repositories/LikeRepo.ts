import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { PostLike } from '../Entities/Like';

@EntityRepository(PostLike)
export class PostLikeRepo extends Repository<PostLike> { }

// @EntityRepository(CommentLike)
// export class CommentLikeRepo extends Repository<CommentLike> { }