import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { PostImage } from "../Entities/Image";
import { Post } from "../Entities/Post";

export class PostDTO {

	public title: string;

	public text_content: string; 

	public toEntity(): Post {
		const { title, text_content } = this;
		const newPost = new Post();
		
		newPost.title = title;
		newPost.text_content = text_content;

		return newPost;
	}

	public updateEntity(target) {
		const { title, text_content } = this;

		if( title )
			target.entity.title = title;

		if( text_content )
			target.entity.text_content = text_content;
	}

	public fromJson(json) {
		const { title, text_content } = json

		this.title = title;
		this.text_content = text_content;
	}
}

