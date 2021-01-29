/**
import { post } from 'request';
 * Image Uplaod
 */

const multer 	= require('multer');
const express 	= require('express');
const path 		= require('path');

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

const profile_img_multer = multer({
	dest: 'upload/Images/Profiles',
	fileFilter: ImagefileFilter
});

export class ImageUpdateControl {

	public router;

	constructor() {
		this.router = express.Router();

		this.router.post(
			'/profile_img', 
			profile_img_multer.single('profile_image'),
		);
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