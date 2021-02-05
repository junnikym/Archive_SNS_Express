import { EntityRepository, Repository } from 'typeorm';
import { Group, ChatGroup, PostGroup } from '../Entities/Group';

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends Repository<ChatGroup> {}

@EntityRepository(PostGroup)
export class PostGroupRepo extends Repository<PostGroup> {}