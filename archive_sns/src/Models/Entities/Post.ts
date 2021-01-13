import {
	Entity,

	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,

	OneToOne,
	OneToMany,
	JoinColumn,

} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { type } from "os";

import { Account } from "./Account";
import { Image, PostImage } from './Image';

/**
 * Post Entity
 */

@Entity({ name: "post" })
export class Post {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "title" })
	title: string;

	@IsNotEmpty()
	@Column({ name: "text_content" })
	text_content: string;

	@IsNotEmpty()
	@OneToOne((Type) => Account)
	@JoinColumn({name: 'writer'})
	writer: Account;

	@OneToMany( (type) => PostImage, (PostImage) => PostImage.post )
	photos: PostImage[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}

