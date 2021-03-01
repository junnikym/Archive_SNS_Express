import { EntityRepository, Repository } from 'typeorm';
import { Group, ChatGroup, PostGroup, GroupParticipant } from '../Entities/Group';

class GroupRepo<T extends (ChatGroup | PostGroup)> extends Repository<T> {

	public async getRecivers(sender_pk:string, group_pk: string) {

		const query_result = await this.createQueryBuilder("group")
				.leftJoinAndSelect("group.participant", "participant")
				.where("group.pk = :group_pk", {group_pk})
				.getOne();

		const result = [];
		query_result.participant.map( elem => {
			if(sender_pk == elem.participant_pk) return;

			result.push(elem.pk);
		});

		return result;
	}

	// public async deleteGroup(admin_pk, group_pk) {
		
	// }

	public async searchGroup( query: string ) : Promise<Group[]> {
		return this.createQueryBuilder("group")
			.where("group.title like :query", { query:`%${query}%` })
			.getMany();
	}
}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends GroupRepo<ChatGroup> {}

@EntityRepository(PostGroup)
export class PostGroupRepo extends GroupRepo<PostGroup> {}

@EntityRepository(GroupParticipant)
export class GroupParticipantRepo extends Repository<GroupParticipant> {
	
	public async newParticipant( account_pk: string[], group_pk: string, default_rank = 0 ) {
		const result = [];

		account_pk.map( pk => {
			const new_ent = new GroupParticipant;
			new_ent.participant_pk 	= pk;
			new_ent.group_pk 		= group_pk;
			new_ent.rank			= default_rank;

			result.push( this.save(new_ent) );
		});

		return result;
	}

}