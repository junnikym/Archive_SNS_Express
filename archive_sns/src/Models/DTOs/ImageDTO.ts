import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { Image } from "../Entities/Image";

export class CreateImageDTO {
	@IsNotEmpty()
	url: string;

	public toEntity(): Image {
		const { url } = this;

		const newImage = new Image();
		newImage.url = url;

		return newImage;
	}
}