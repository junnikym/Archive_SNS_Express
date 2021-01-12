import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	Unique
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Account } from './Account';

/**
 * Entity which is for saving Image
 */
@Entity({ name: "image" })
export class Image {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "file_name" })
	url: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

}

/**
 * Image Entity For which will be use profile image
 */
@Unique(["image"])
@Entity({ name: "profile_image" })
export class ProfileImage {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@OneToOne((Type) => Account)
	@JoinColumn({name: 'image'})
	account: Account;

	@OneToOne((Type) => Image)
	@JoinColumn()
	image: Image;

}

/**
 * Image Entity For which will be use post image
 */
// @Entity({ name: "post_image" })
// export class PostImage {

// 	@OneToOne((Type) => Post)
// 	@JoinColumn()
// 	post: Post;

// 	@OneToOne((Type) => Image)
// 	@JoinColumn()
// 	image: Image;
// }
