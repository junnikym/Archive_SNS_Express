/**
import { post } from 'request';
 * Image Uplaod
 */

const multer 	= require('multer');
const express 	= require('express');
const path 		= require('path');

// JWT middleware
import { 
	VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { PostImageService } from '../services/ImageService';
import { ImageDTO } from '../Models/DTOs/ImageDTO';
import { Length } from 'class-validator';

const ImagefileFilter = (req, file, callback) => {
	const ext = path.extname(file.originalname);

	if (
		ext !== '.png' && 
		ext !== '.jpg' && 
		ext !== '.gif' && 
		ext !== '.jpeg'
	) {
		return callback(new Error('Only images are allowed'));
	}

	callback(null, true)
}

const post_img_multer = multer({
	dest: 'upload/Images/Post',
	fileFilter: ImagefileFilter
});

const profile_img_multer = multer({
	dest: 'upload/Images/Profiles',
	fileFilter: ImagefileFilter
});

export class ImageUpdateControl {

	public router;

	private post_image_service : PostImageService;

	constructor(
		post_image_service: PostImageService
	) {
		this.post_image_service = post_image_service;

		this.router = express.Router();

		this.router.post(
			'/post_img',
			post_img_multer.array('image', 30),
			VerifyAccessToken,
			this.PostImage
		);

		this.router.post(
			'/profile_img', 
			profile_img_multer.single('image'),
			VerifyAccessToken,
			this.ProfileImage
		);

	}

	private async PostImage(req, res) {
		console.log("asdf");

		const image = req.files;
		const path = image.map(img => img.path);

		const image_dto = new ImageDTO;
		image_dto.url = "asdf";

		console.log("asdf");

		this.post_image_service.UpdatePost(
		  "1e4a0d14-4665-4e5d-9d97-891bdad0dab6",
		  image_dto
		)

		const fail = () => {
			res.tatus(400).send({
				status: 400, 
				success: false, 
				message: "이미지가 존재하지 않습니다."
			});
		}

		console.log("are you not working?");

		if(image === undefined) {
			console.log("are you returning fail?");
			return fail();
		}

		console.log("so what the hell is wrong?");

		const user_pk = res.locals.jwt_payload.pk;

		console.log("bring the localhost.jwt_payload");

		const img_dto = new ImageDTO;

		console.log("make a new dto");

		const images = [];

		// console.log("image serviece is ", this.post_image_service);
		console.log("make a images list for return result");

		for(let i = 0;  i < path.length; i++) {
			img_dto.url = path[i];

			console.log("in control loop : ", i);
			const result = await this.post_image_service.UpdatePost(user_pk, img_dto);
			
			if(!result)
				return fail();

			images.push(result);
		}

		res.status(200).send({
			status: 200,
			success: true,
			message: "success",
			data: images
		});
	}

	/**
	 * 
	 * @param path : 
	 */
	private ProfileImage(req, res) {
		const image = req.file.path;

		if(image === undefined) {
			return res.tatus(400).send({
				status: 400, 
				success: false, 
				message: "이미지가 존재하지 않습니다."
			});
		}

		res.status(200).send({
			status: 200,
			success: true,
			message: "success",
			data: image
		});
	}

}