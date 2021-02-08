import {
	Entity,

	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,

	OneToOne,
	OneToMany,
	JoinColumn,
	ManyToOne,

} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { type } from "os";

import { Account } from "./Account";
import { Image, PostImage } from './Image';
import { PostGroup } from './Group';

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
	@Column({ name: "text_content", default: "" })
	text_content: string;

	@IsNotEmpty()
	@Column({ name: "writer", length: 36, nullable: false })
	writer_pk: string;

	@ManyToOne((type) => Account, (account) => account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "writer" })
	writer: Account;

	// @IsNotEmpty()
	// @Column({ name: "group", length: 36, nullable: false })
	// group_pk: string;

	// @ManyToOne((type) => PostGroup, (post_group) => post_group.pk, {
	// 	cascade: true,
	// 	onDelete: "CASCADE",
	// })
	// @JoinColumn({ name: "group" })
	// group: PostGroup;

	@OneToMany( (type) => PostImage, (PostImage) => PostImage.post )
	image: PostImage[];

	@Column({ default: 0 })
	n_like: number;

	@Column({ default: 0 })
	view: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@Column({ 
		default: 0, 
		comment: "popularly score"
	})
	q_score: number;

	// @Column({
	// 	default: 0
	// })
	// permission: number;

}

