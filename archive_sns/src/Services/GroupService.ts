import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { ChatGroupRepo, PostGroupRepo, GroupParticipantRepo } from '../Models/Repositories/GroupRepo';
import { AccountRepo } from '../Models/Repositories/AccountRepo';

import { ChatGroup, Group, PostGroup } from '../Models/Entities/Group';
import { Account } from '../Models/Entities/Account';

import { GroupDTO } from '../Models/DTOs/GroupDTO';

abstract class GroupService<
	RepoType extends (ChatGroupRepo | PostGroupRepo),
	EntType extends (ChatGroup | PostGroup)
> {

	protected group_repo;
	protected account_repo;
	protected group_participant_repo;

	protected n_min_early_member = 1;

	constructor(
		group_repo: RepoType,
		account_repo: AccountRepo,
		group_participant_repo: GroupParticipantRepo
	) {
		this.group_repo = group_repo;
		this.account_repo = account_repo;
		this.group_participant_repo = GroupParticipantRepo;
	}

	/**
	 * Create Group
	 * 
	 * @param creater_account_pk : creater's account pk
	 * @param group_dto : group dto
	 * @param member_pk_list : participant's pk 
	 */
	public async CreateGroup(
		creater_account_pk: string,
		group_dto: GroupDTO,
	) : Promise<EntType> 
	{
		const { member_pk_list } = group_dto;

		if(member_pk_list.length < this.n_min_early_member)
			return undefined;

		// < Check is Account exist >
		const account = await this.account_repo.FindByPKs(member_pk_list);
		if( !account ) 
			return undefined;

		const new_group = group_dto.toEntity() as EntType;

		const result = await this.group_repo.save(new_group);

		this.group_participant_repo.newParticipant(
			group_dto.member_pk_list,
			result.pk,
			group_dto?.lowest_rank 
		);

		return result;
	}

	public async DeleteGroup(
		admin_pk: string,
		group_pk: string
	): Promise<boolean> 
	{
		const target = await this.group_repo.findOne({ 
			where: {pk: group_pk}
		});

		// < Check is PK admin's PK >
		this.group_participant_repo.findMany({
			where: {participant_pk: admin_pk, group_pk}
		});
		
		await this.group_repo.delete(target);
		return true;
	}

	public async Invite(
		group_dto: GroupDTO
	) {
		const {group_pk, member_pk_list} = group_dto;

		if(!group_pk) return undefined;

		if(member_pk_list.length < this.n_min_early_member)
			return undefined;
		
		// < Check is Group exist >
		const group = await this.group_repo.findOne({ where: {pk: group_pk} });
		if( !group )
			return undefined;

		// < Check is Account exist >
		const account = await this.account_repo.FindByPKs(member_pk_list);
		if( !account ) 
			return undefined;

		await this.group_participant_repo.newParticipant(
			member_pk_list,
			group_pk
		);

		return group;
	}
}

export class ChatGroupService extends GroupService< ChatGroupRepo, ChatGroup > {

	constructor(
		@InjectRepository() group_repo : ChatGroupRepo,
		@InjectRepository() account_repo : AccountRepo,
		@InjectRepository() group_participant_repo: GroupParticipantRepo
	) {
		super(group_repo, account_repo, group_participant_repo);
		this.n_min_early_member = 2;
	}

}

export class PostGroupService extends GroupService< PostGroupRepo, PostGroup > {

	constructor(
		@InjectRepository() group_repo : PostGroupRepo,
		@InjectRepository() account_repo : AccountRepo,
		@InjectRepository() group_participant_repo: GroupParticipantRepo
	) {
		super(group_repo, account_repo, group_participant_repo);
	}

	public async searchGroup(query: string) {
		return this.group_repo.searchGroup(query);
	}

}