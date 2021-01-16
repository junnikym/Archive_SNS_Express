import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Post } from '../Entities/Post';

@EntityRepository(Post)
export class PostRepo extends Repository<Post> { }