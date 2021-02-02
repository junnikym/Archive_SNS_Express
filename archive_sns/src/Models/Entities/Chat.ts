import { 
	Column,
	JoinColumn,
	JoinTable,
	Entity,
	OneToMany,
	ManyToMany,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToOne
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { type } from 'os';
import { Account } from "./Account";


@Entity({ name: "chat_group" })
export class ChatGroup {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@ManyToMany(
		(type) => Account, 
		(account) => account.chat_group, 
		{ nullable: false }
	)
	@JoinTable()
	participant: Account[];
}

@Entity({ name: "chat_msg" })
export class ChatMsg {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "writer_pk", length: 36 })
	writer_pk: string;

	@ManyToOne( (type) => Account, (Account) => Account.pk )
	@JoinColumn({ name: "writer" })
	writer: Account;

	@Column({ name: "group_pk", length: 36 })
	group_pk: string;

	@ManyToOne( type => ChatGroup, (chat_group) => chat_group.pk )
	@JoinColumn({ name: 'chat_group' })
	group: ChatGroup;

	@Column({ name: "content" })
	content: string;
}