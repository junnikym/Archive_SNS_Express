import { 
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	CreateDateColumn,
	ManyToOne
} from 'typeorm';

import { Account } from './Account';
import { Post } from './Post';

abstract class Like {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	giver: Account;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;
}

@Entity()
export class PostLike extends Like {
	@ManyToOne((type) => Post, (Post) => Post.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "post" })
	post: Post;
}

// @Entity
// export class CommentLike extends Like {
// 	@ManyToOne((type) => Comment, (Comment) => Comment.pk, {
// 		cascade: true,
// 		onDelete: "CASCADE",
// 	})
// 	@JoinColumn({ name: "comment" })
// 	comment: Comment;
// }