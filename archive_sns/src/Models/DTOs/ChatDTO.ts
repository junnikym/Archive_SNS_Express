import { IsNotEmpty } from "class-validator";
import { ChatMsg } from '../Entities/Chat';

export class ChatMsgDTO {
	
	@IsNotEmpty()
	content: string

	public async toEntity() {
		const { content } = this;

		const chat_msg_ent = new ChatMsg;
		chat_msg_ent.content = content;

		return chat_msg_ent;
	}

}
