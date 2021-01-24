import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Account } from './Account';

/**
 * Friend Entity
 */

@Entity({ name: "firend" })
export class Friend {

	@PrimaryGeneratedColumn("uuid")
	pk: string;

	@Column({ name: "accept", default: false })
	accept: boolean;

	// < Account >
	// --------------------------------------------------

	@IsNotEmpty()
	@Column({ name: "account_pk", length: 36 })
	account_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "account" })
	account: Account;

	// < Friend >
	// --------------------------------------------------

	@IsNotEmpty()
	@Column({ name: "friend_pk", length: 36 })
	friend_pk: string;

	@ManyToOne((type) => Account, (Account) => Account.pk, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "friend" })
	friend: Account;

}

