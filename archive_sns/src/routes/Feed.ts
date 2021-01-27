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
 * 결과처리
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = (result, res) => {
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
 * 
 * @param post_pk : 
 */
router.get(
  '/:postpk', 
  async (req, res) => {
    const post_pk = req.params.post_pk;

    const Post_Service = new PostService();
    const Get_SinglePost_Result = await Post_Service.GetSinglePost(
      post_pk
    );
    return status(Get_SinglePost_Result, res);
});

// /**
//  * GetPostList
//  * 
//  * @param 
//  */
// router.get(
//   '/', 
//   (req, res) => {
//     const feed_Info = req.body;
// });

/**
 * GetOwnPost
 * 
 * @param writer_pk : 
 * @param offset : 
 * @param limit :
 */
router.get(
  '/:witer_pk', 
  async (req, res) => {
    const writer_pk = req.params.witer_pk;
    const offset = req.body.offset;
    const limit = req.body.limit;

    const Post_Service = new PostService();
    const Get_OwnPost_Result = await Post_Service.GetOwnPost(
      writer_pk,
      offset,
      limit
    );
    return status(Get_OwnPost_Result, res);
});

/**
 * CreatePost
 * 
 * @param user_pk : jwt tokken
 * @param post_dto : PostDTO(title, text_content)
 * @param img_dto : ImageDTO(url)
 */
router.post(
  '/', 
  VerifyAccessToken,
  async (req, res) => {
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
 * UpdatePost
 * 
 * @param user_pk : jwt tokken
 * @param post_pk : 
 * @param Post_Update_DTO : PostDTO(title, text_content)
 * @param ImgDTO : ImageDTO(url)
 * @param null : 
 */
router.put(
  '/:feednum',
  VerifyAccessToken,
  async (req, res) => { 
  const feed_Info = req.body;
  const user_pk = res.locals.jwt_payload.pk;

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
    user_pk,
    feed_Info.post_pk,
    Post_Update_DTO,
    ImgDTO,
    null
  )
  return status(Update_Feed, res);
});

/**
 * DeletePost
 * 
 * @param user_pk : jwt tokken
 * @param post_pk :
 */  
router.delete(
  '/:feednum', 
  VerifyAccessToken,
  async (req, res) => {
  const feed_Info = req.body;
  const post_pk = feed_Info.post_pk;
  const user_pk = res.locals.jwt_payload.pk;

  const Post_Service = new PostService();

  const Delete_Feed = await Post_Service.DeletePost(
    user_pk,
    post_pk
  )
  return status(Delete_Feed, res);
});

module.exports = router;