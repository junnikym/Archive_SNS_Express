import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Image, PostImage } from "../Entities/Image";

export class ImageDTO {
	@IsNotEmpty()
	url: string;

	public toEntity(): Image {
		const { url } = this;

		const newImage = new Image;
		newImage.url = url;

		return newImage;
	}

	public updateEntity(target) {
		const { url } = this;

		target.entity.url = url;
	}

	public fromJson(json) {
		const { url } = json

		this.url = url;
	}
}
