import {
	EntityManager,
	EntityRepository, Repository, TransactionManager
} from "typeorm";

import { Image, ProfileImage } from '../Entities/Image';

@EntityRepository(Image)
export class ImageRepo extends Repository<Image> {}

@EntityRepository(ProfileImage)
export class ProfileImageRepo extends Repository<Image> {}