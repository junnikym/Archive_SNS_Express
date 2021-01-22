import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Image, PostImage } from '../Entities/Image';

@EntityRepository(Image)
export class ImageRepo extends Repository<Image> {}

@EntityRepository(PostImage)
export class PostImageRepo extends Repository<PostImage> {}