import { 
	Column,
	JoinColumn,
	JoinTable,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToOne
} from "typeorm";
import { IsNotEmpty } from "class-validator";

import { Account } from "./Account";
import { ChatGroup } from './Group';

/**
 * Chat Massage Entity
 */
@Entity({ name: "chat_msg" })
export class ChatMsg {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "writer_pk", length: 36 })
	writer_pk: string;

	@ManyToOne( (type) => Account, (Account) => Account.pk )
	@JoinColumn({ name: "writer" })
	writer: Account;

	@ManyToOne((type) => ChatGroup, (chat_group) => chat_group.chat_msg, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "chat_group" })
	chat_group: ChatGroup;

	@Column({ name: "content" })
	content: string;
}