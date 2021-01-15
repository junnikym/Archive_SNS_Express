import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { PostImage } from "../Entities/Image";
import { Post } from "../Entities/Post";
import { ImageOnlyContentsDTO } from "../DTOs/ImageDTO";

export class CreatePostDTO {

	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	text_content: string;

	public toEntity(): Post {
		const { title, text_content } = this;

		const newPost = new Post();
		newPost.title = title;
		newPost.text_content = text_content;

		return newPost;
	}

}

export class UpdateEntityDTO  {

	title: string | null;
	text_content: string | null;
	
	public UpdateEntity(target) {
		const { title, text_content } = this;

		if( title )
			target.entity.title = title;

		if( text_content )
			target.entity.text_content = text_content;
	}

}