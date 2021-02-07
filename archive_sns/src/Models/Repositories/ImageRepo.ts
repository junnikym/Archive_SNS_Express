import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { PostImage } from '../Entities/Image';

@EntityRepository(PostImage)
export class PostImageRepo extends Repository<PostImage> {}