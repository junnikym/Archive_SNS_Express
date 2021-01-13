import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { PostImage } from "../Entities/Image";
import { Post } from "../Entities/Post";

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