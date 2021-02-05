import { EntityRepository, Repository } from 'typeorm';
import { Group, ChatGroup, PostGroup } from '../Entities/Group';

class GroupRepo<T> extends Repository<T> {}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends GroupRepo<ChatGroup> {}

@EntityRepository(PostGroup)
export class PostGroupRepo extends GroupRepo<PostGroup> {}