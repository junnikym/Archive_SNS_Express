import { 
	Entity, 
	ChildEntity,
	TableInheritance,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	JoinColumn,
	ManyToOne,
} from 'typeorm';

import { Account } from './Account';
import { Post } from './Post';

@Entity({ name: "comment" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "file_name" })
	content: string;

	@Column({ name: "writer_pk", length: 36 })
	writer_pk: string;

	@Column({ default: 0 })
	n_like: number;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	writer: Account;
}

@ChildEntity()
export class PostComment extends Comment {

	@Column({ name: "post_pk", length: 36 })
	post_pk: string;

	@ManyToOne((type) => Post, (Post) => Post.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "post" })
	post: Post;
}

@ChildEntity()
export class PostReComment extends Comment {

	// < Parent >
	//	: The comment or re-comment which linking directly with this re-comment

	@Column({ name: "parent_pk", length: 36 })
	parent_pk: string;

	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "parent" })
	parent: Comment;

	// < Root > 
	//	: starting comment (source comemnt) of re-comment

	@Column({ name: "root_pk", length: 36 })
	root_pk: string;

	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "root" })
	root: Comment;

}