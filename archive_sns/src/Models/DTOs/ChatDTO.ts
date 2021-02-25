import { IsEmpty, Length, IsNotEmpty, IsString } from "class-validator";
import { ChatMsg } from '../Entities/Chat';
import sanitizeHtml from 'sanitize-html';

export class ChatMsgDTO {

	@IsNotEmpty()
	@Length(36)
	@IsString()
	group_pk: string;
	
	@IsNotEmpty()
	@IsString()
	content: string

	public async toEntity() {
		const { content, group_pk } = this;

		const chat_msg_ent = new ChatMsg;
		chat_msg_ent.content = sanitizeHtml(content);
		chat_msg_ent.group_pk = sanitizeHtml(group_pk);

		return chat_msg_ent;
	}

}
