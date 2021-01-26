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

/**
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = function(result, res){
  if(!result){
      return res.status(403).send({
          status : 403,
          success : true,
          message : "Forbidden"
      });
  };
  return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
  });
}

/**
 * GetSinglePost
 */
router.get(
  '/:postpk', 
  async function(req, res) {
    const postNum = req.params.postpk;

    const Post_Service = new PostService();
    const Get_SinglePost_Result = await Post_Service.GetSinglePost(
      postNum
    );
    return status(Get_SinglePost_Result, res);
});

/**
 * GetPostList
 */
router.get(
  '/', 
  function(req, res) {
    const feed_Info = req.body;
});

/**
 * GetOwnPost
 */
router.get(
  '/:witer_pk', 
  async function(req, res) {
    const post_Info = req.body;
    const writer_pk = req.params.witer_pk;
    const offset = post_Info.offset;
    const limit = post_Info.limit;

    const Post_Service = new PostService();
    const Get_OwnPost_Result = await Post_Service.GetOwnPost(
      writer_pk,
      offset,
      limit
    );
    return status(Get_OwnPost_Result, res);
});

/**
 * 피드 생성
 */
router.post(
  '/', 
  VerifyAccessToken,
  async function(req, res) {
    const feed_Info = req.body;
    const user_pk = res.locals.jwt_payload.pk;

    const post_dto = new PostDTO();  //피드 생성 DTO
    let img_dto: ImageDTO[];

    post_dto.title = feed_Info.title;
    post_dto.text_content = feed_Info.content; //DTO에 요청받은 데이터 삽입

    for(let i = 0; i < feed_Info.url.Length; i++) {
      const temp_img_dto = new ImageDTO;
      temp_img_dto.url = feed_Info.url;

      img_dto.push(temp_img_dto);
    }
    
    const Post_Service = new PostService();
    const create_feed = await Post_Service.CreatePost(
      user_pk, 
      post_dto, 
      img_dto
    );
    return status(create_feed, res);
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

  const Post_Service = new PostService();

  const Update_Feed = await Post_Service.UpdatePost(
    pk,
    feed_Info.post_pk,
    Post_Update_DTO,
    ImgDTO,
    null
  )
  return status(Update_Feed, res);
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

  const Post_Service = new PostService();

  const Delete_Feed = await Post_Service.DeletePost(
    pk,
    Feed_pk
  )
  return status(Delete_Feed, res);
});

module.exports = router;