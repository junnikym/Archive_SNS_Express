import { EntityRepository, Repository } from 'typeorm';
import { Group, ChatGroup, PostGroup } from '../Entities/Group';

class GroupRepo<T extends (ChatGroup | PostGroup)> extends Repository<T> {

	public async getRecivers(sender_pk:string, group_pk: string) {

		const query_result = await this.createQueryBuilder("group")
				.leftJoinAndSelect("group.participant", "participant")
				.where("group.pk = :group_pk", {group_pk})
				.getOne();

		const result = [];
		query_result.participant.map( elem => {
			if(sender_pk == elem.pk) return;

			result.push(elem.pk);
		});

		return result;
	}

}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends GroupRepo<ChatGroup> {}

@EntityRepository(PostGroup)
export class PostGroupRepo extends GroupRepo<PostGroup> {}