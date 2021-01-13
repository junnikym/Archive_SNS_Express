import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Image } from "./Image";

/**
 * Account Entity
 */

@Entity({ name: "account" })
export class Account {
	
	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@IsNotEmpty()
	@Column({ name: "password" })
	password: string;

	@IsNotEmpty()
	@Column({ name: "name", length: 64 })
	name: string;

	@IsNotEmpty()
	@Column({ name: "email", length: 64 })
	email: string;

	@OneToOne( (type) => Image, { nullable: true } )
	@JoinColumn({ name: "profile_image" })
	profile_image: Image | null;

	async check_password(target: string): Promise<boolean> {
		return (this.password == target);
	}
}

