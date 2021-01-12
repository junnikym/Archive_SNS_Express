import {
	EntityRepository, Repository
} from "typeorm";

import { Account } from '../Entities/Account';

@EntityRepository(Account)
export class AccountRepo extends Repository<Account> {}