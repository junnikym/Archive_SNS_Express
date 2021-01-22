/**
 *  피드 관련 라우트
 */
const express = require('express');
const router = express.Router();

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostService } from "../services/PostService";

import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";


// /**
//  * 피드 보기
//  */
// router.get('/', function(req, res) {
//     const feed_Info = req.body;

    
// });

/**
 * 피드 생성
 */
router.post(
  '/', 
  VerifyAccessToken,
  async function(req, res) {
    const feed_Info = req.body;
    const pk = res.locals.jwt_payload.pk;

    const post_dto = new PostDTO();  //피드 생성 DTO
    let img_dto: ImageDTO[];

    post_dto.title = feed_Info.title;
    post_dto.text_content = feed_Info.content; //DTO에 요청받은 데이터 삽입

    for(let i = 0; i < feed_Info.url.Length; i++) {
      const temp_img_dto = new ImageDTO;
      temp_img_dto.url = feed_Info.url;

      img_dto.push(temp_img_dto);
    }
    
    const post_create = new PostService();
    const create_feed = await post_create.CreatePost(
      pk, 
      post_dto, 
      img_dto
    );

    if(!create_feed){
      return res.state(403).send({
        status : 403,
        success : true,
        message : "Forbidden"
      });
    }

    return res.status(200).send({
      status : 200,
      success : true,
      message : "success"
    });
});

/**
 * 피드 수정
 */
router.put(
  '/:feednum',
  VerifyAccessToken,
  async function(req, res) { 
  const feed_Info = req.body;
  const pk = res.locals.jwt_payload.pk;

  const Post_Update_DTO = new PostDTO();
  Post_Update_DTO.title = feed_Info.title;
  Post_Update_DTO.text_content = feed_Info.text_content;

  let ImgDTO: ImageDTO[];
  
  for(let i = 0; i < feed_Info.url.Length; i++) {
    const temp_img_dto = new ImageDTO;
    temp_img_dto.url = feed_Info.url;

    ImgDTO.push(temp_img_dto);
  }

  const Post_Update = new PostService();

  const Update_Feed = await Post_Update.UpdatePost(
    pk,
    feed_Info.post_pk,
    Post_Update_DTO,
    ImgDTO,
    null
  )

  if(!Update_Feed){
    return res.status(403).send({
      status : 403,
      success : true,
      message : "Forbidden"
    });
  }

  return res.status(200).send({
    status : 200,
    success : true,
    message : "success"
  });
});

/*
 * 피드 삭제 
 */  
router.delete(
  '/:feednum', 
  VerifyAccessToken,
  async function(req, res) {
  const feed_Info = req.body;
  const Feed_pk = feed_Info.post_pk;
  const pk = res.locals.jwt_payload.pk;

  const Feed_Delete = new PostService();

  const Delete_Feed = await Feed_Delete.DeletePost(
    pk,
    Feed_pk
  )

  if(!Delete_Feed){
    return res.status(403).send({
      status : 403,
      success : true,
      message : "Forbidden"
    });
  }

  return res.status(200).send({
    status : 200,
    success : true,
    message : "success"
  });
});

module.exports = router;