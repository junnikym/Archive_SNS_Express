import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	JoinTable
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Image } from "./Image";
import { ChatGroup } from "./Chat";

/**
 * Account Entity
 */

@Entity({ name: "account" })
export class Account {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "email", length: 64 })
	email: string;

	@IsNotEmpty()
	@Column({ name: "password" })
	password: string;

	@IsNotEmpty()
	@Column({ name: "name", length: 64 })
	name: string;

	@OneToOne( (type) => Image, { nullable: true } )
	@JoinColumn({ name: "profile_image" })
	profile_image: Image | null;

	@ManyToMany( 
		(type) => ChatGroup, 
		(chat_group) => chat_group.participant, 
		{ nullable: true }
	)
	chat_group: ChatGroup[];

	@Column({ name: "status_msg", nullable: true })
	status_msg: string;

	@Column({ name: "refresh_token", nullable: true, select: false })
	refresh_token: string;

	async check_password(target: string): Promise<boolean> {
		return (this.password == target);
	}
}

