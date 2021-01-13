import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

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

	async check_password(target: string): Promise<boolean> {
		return (this.password == target);
	}
}

