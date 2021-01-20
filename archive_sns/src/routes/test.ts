var express = require('express');
var router = express.Router();

import { userInfo } from "os";
/**
 * Authentification Service / DTO
 */

import { LoginAccountDTO } from "../Models/DTOs/AccountDTO";
import { AuthService } from "../services/AuthService";

import { PostLikeService } from '../services/LikeService';
import { AccountService } from "../services/AccountService";
import { CreateAccountDTO } from "../Models/DTOs/AccountDTO";
import { PostService } from '../services/PostService';
import { CreatePostDTO } from '../Models/DTOs/PostDTO';
import { Service } from 'typedi';
import { PostCommentService } from '../services/CommentService';
import { CreateCommentDTO, UpdateCommentDTO } from '../Models/DTOs/CommentDTO';
// Post Testing

router.get('/', function(req, res) {  //확인용 폼
  const login = `
    <form action="/test/try/" method="post">
      <p><input type="submit"></p>
    </form>
    `
  res.send(login);
});


router.post('/try', async function(req, res) {

	// const post_service = new PostService;
	// const post_dto = new CreatePostDTO;

	// post_dto.title = "Post Create Test";
	// post_dto.text_content = "testing post's main content, which for testing service modules";
	
	// post_service.CreatePost(
	// 	'027bdec7-ce58-4f2d-861e-43234b182ca7',
	// 	post_dto,
	// 	null
	// );

	const service = new PostCommentService(

	);

	const dto = new UpdateCommentDTO;
	dto.content = "this is updated comment for update post comment test";

	const result = await service.DeleteComment(
		'027bdec7-ce58-4f2d-861e-43234b182ca7',
		'81a05fcd-14de-49b5-8b5b-45f41fb5ea5f'
	);

	console.log(result ? "success" : "fail");

	res.redirect('/test');
});

module.exports = router;