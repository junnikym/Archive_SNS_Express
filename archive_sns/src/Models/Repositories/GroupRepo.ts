import { EntityRepository, Repository } from 'typeorm';
import { Group, ChatGroup, PostGroup } from '../Entities/Group';

class GroupRepo<T> extends Repository<T> {

	public getParticipant(group_pk: string) {
		console.log("here");

		return this.createQueryBuilder("group")
				.leftJoinAndSelect("group.participant", "participant")
				.where("group.pk = :group_pk", {group_pk})
				.getOne();
	}

}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends GroupRepo<ChatGroup> {}

@EntityRepository(PostGroup)
export class PostGroupRepo extends GroupRepo<PostGroup> {}