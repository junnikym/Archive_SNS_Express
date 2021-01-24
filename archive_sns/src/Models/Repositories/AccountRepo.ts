import {
	EntityRepository, Repository
} from "typeorm";

import { Account } from '../Entities/Account';

@EntityRepository(Account)
export class AccountRepo extends Repository<Account> {

	public async FindByPKs( pk_list: string[] ) : Promise<Account[]> {
		return this.createQueryBuilder("Account")
			.where( "account.pk IN (:list)", { list: pk_list } )
			.orderBy("account.createDate")
			.getMany();
	}

}