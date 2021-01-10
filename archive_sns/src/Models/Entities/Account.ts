import {
	Entity,
	PrimaryGeneratedColumn,
	Column,

	EntityRepository, Repository 
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
	@Column({ name: "id", length: 64 })
	id: string;

	@IsNotEmpty()
	@Column({ select: false })
	password: string;

	@IsNotEmpty()
	@Column({ name: "name", length: 64 })
	name: string;

	@IsNotEmpty()
	@Column({ length: 64 })
	email: string;

}

@EntityRepository(Account)
export class UserRepository extends Repository<Account> { }
