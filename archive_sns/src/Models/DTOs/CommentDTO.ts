import { IsNotEmpty, Length, IsEmail, IsString, IsEmpty, IsOptional } from "class-validator";
import { Comment, PostComment, PostReComment } from '../Entities/Comment';

export class CommentDTO {

	@IsOptional()
	@IsString()
	@Length(36)
	public comment_pk: string;
	
	@IsNotEmpty()
	@IsString()
	public content: string

	public toEntity(): Comment{
		const { content } = this;

		const new_comment = new Comment();
		new_comment.content = content;
		
		return new_comment;
	}

	public updateEntity(target) {
		const { content } = this;

		target.entity.content = content;
	}

	public fromJson(json) {
		const { content } = json;
		
		this.content = content;
	}
}

export class PostCommentDTO extends CommentDTO {

	@IsEmpty()
	@Length(36)
	@IsString()
	public post_pk

	public toEntity(): PostComment {
		const new_ent: PostComment = 
			super.toEntity() as PostComment;

		new_ent.post_pk = this.post_pk;

		return new_ent;
	}

}