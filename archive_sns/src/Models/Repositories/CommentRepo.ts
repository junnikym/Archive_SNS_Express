import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { PostComment, PostReComment } from '../Entities/Comment';

@EntityRepository(PostComment)
export class PostCommentRepo extends Repository<PostComment> { }

@EntityRepository(PostReComment)
export class PostReCommentRepo extends Repository<PostReComment> { }
