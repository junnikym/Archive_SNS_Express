import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Comment, PostComment, PostReComment } from '../Entities/Comment';

export class CreateCommentDTO {
	@IsNotEmpty()
	public content: string;

	public toEntity(): Comment{
		const { content } = this;

		const new_comment = new Comment();
		new_comment.content = content;
		
		return new_comment;
	}
}

export class UpdateCommentDTO {
	@IsNotEmpty()
	public content: string;

	public updateEntity(target) {
		const { content } = this;

		target.entity.content = content;
	}
}