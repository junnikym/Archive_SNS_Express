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
	private post_image_service: PostImageService;

	constructor(
		post_image_service: PostImageService
	) {
		this.post_image_service = post_image_service;

		this.router = express.Router();

		this.router.post(
			'/post_img',
			post_img_multer.array('image', 30),
			VerifyAccessToken,
			async (req, res) => this.PostImage(req, res)
		);

		this.router.post(
			'/profile_img', 
			profile_img_multer.single('image'),
			VerifyAccessToken,
			async (req, res) => this.ProfileImage(req, res)
		);

	}

	private async PostImage(req, res) {
		
		const image = req.files;
		const path = image.map(img => img.path);

		console.log("asdf");

		const fail = () => {
			res.tatus(400).send({
				status: 400, 
				success: false, 
				message: "이미지가 존재하지 않습니다."
			});
		}

		if(image === undefined) 
			return fail();

		const user_pk = res.locals.jwt_payload.pk;

		const img_dto = new ImageDTO;

		const images = [];

		for(let i = 0;  i < path.length; i++) {
			img_dto.url = path[i];

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