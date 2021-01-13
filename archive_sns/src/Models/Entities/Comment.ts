import { 
	Entity, 
	ChildEntity,
	TableInheritance,
	PrimaryGeneratedColumn,
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

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	writer: Account;
}

@ChildEntity({ name: "post_comment" })
export class PostComment extends Comment {
	@ManyToOne((type) => Post, (Post) => Post.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "post" })
	post: Post;
}

@ChildEntity({ name: "post_re_comment" })
export class PostReComment extends Comment {
	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "parent" })
	parent: Comment;
}