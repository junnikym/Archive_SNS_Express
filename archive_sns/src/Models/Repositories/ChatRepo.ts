import { EntityRepository, Repository } from 'typeorm';
import { ChatMsg } from '../Entities/Chat';

@EntityRepository(ChatMsg)
export class ChatMsgRepo extends Repository<ChatMsg> {}