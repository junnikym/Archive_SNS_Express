import {
	Column,
	Entity, 
	ManyToMany, 
	OneToMany,
	PrimaryGeneratedColumn,
	TableInheritance,
	JoinTable,
	ChildEntity,
	ManyToOne,
	OneToOne
} from "typeorm";
import { Account } from './Account';
import { ChatMsg } from './Chat';
import { Post } from "./Post";

@Entity({ name : "group" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Group {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "title" })
	title: string;

	@ManyToMany(
		(type) => Account, 
		(Account) => Account.pk,
		{ nullable: false }
	)
	@JoinTable()
	participant: Account[];
}

@ChildEntity()
export class ChatGroup extends Group {

	@OneToMany((type) => ChatMsg, (chat_msg) => chat_msg.group)
	chat_msg: ChatMsg[];

}

@ChildEntity()
export class PostGroup extends Group {
	
	@Column({ name: "is_private" })
	is_private: boolean;

	@OneToMany((type) => Post, (post) => post.group)
	post: Post[];

}