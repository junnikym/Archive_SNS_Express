/**
 *  피드 관련 라우트
 */

const express = require('express');

// JWT middleware
import { 
  VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { PostService } from "../services/PostService";

import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";

import { Post } from '../Models/Entities/Post';

export class PostControl {

  public router;

  private post_service : PostService;

  constructor(
    post_service : PostService
  ) {

    this.post_service = post_service;

    this.router = express.Router();

    this.router.get(
      '/:postpk', 
      async (req, res) => this.GetSinglePost(req, res)
    );

    this.router.post(
      '/', 
      async (req, res) => this.GetPostList(req, res)
    );

    this.router.get(
      '/:witer_pk', 
      async (req, res) => this.GetOwnPost(req, res)
    );

    this.router.post(
      '/create', 
      VerifyAccessToken,
      async (req, res) => this.CreatePost(req, res)
    );

    this.router.put(
      '/:feednum',
      VerifyAccessToken,
      async (req, res) => this.UpdatePost(req, res)
    );

    this.router.delete(
      '/:feednum',
      VerifyAccessToken,
      async (req, res) => this.DeletePost(req, res)
    );

  }

  /**
   * 결과처리
   * 
   * @param result 라우트 처리 결과
   * @param res 상태 처리 결과
   */
  private status = function(result, res){
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
  private async GetSinglePost(req, res) {
    const post_pk = req.params.post_pk;

    const Get_SinglePost_Result = await this.post_service.GetSinglePost(
      post_pk
    );
    
    return this.status(Get_SinglePost_Result, res);
  }

  /**
   * GetPostList
   * 
   * @param 
   */
  private async GetPostList(req, res) {

    const result =  await this.post_service.GetPostList(
      req.body.offset,
      req.body.limit,
      req.body.order_by
    );

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
        data : result
    });
  }

  /**
   * GetOwnPost
   * 
   * @param writer_pk : 
   * @param offset : 
   * @param limit :
   */
  private async GetOwnPost(req, res) {
    const writer_pk = req.params.witer_pk;
    const offset = req.body.offset;
    const limit = req.body.limit;

    const Get_OwnPost_Result = await this.post_service.GetOwnPost(
      writer_pk,
      offset,
      limit
    );

    return this.status(Get_OwnPost_Result, res);
  }

  /**
   * CreatePost
   * 
   * @param user_pk : jwt tokken
   * @param post_dto : PostDTO(title, text_content)
   * @param img_dto : ImageDTO(url)
   */
  private async CreatePost(req, res) {
    const feed_Info = req.body;
    const user_pk = res.locals.jwt_payload.pk;

    const post_dto = new PostDTO();  //피드 생성 DTO
    let img_dto: ImageDTO[];

    post_dto.title        = feed_Info.title;
    post_dto.text_content = feed_Info.content; //DTO에 요청받은 데이터 삽입

    for(let i = 0; i < feed_Info.Length; i++) {
      const temp_img_dto = new ImageDTO;
      temp_img_dto.url = feed_Info.url;

      img_dto.push(temp_img_dto);
    }

    const create_feed = await this.post_service.CreatePost(
      user_pk, 
      post_dto, 
      img_dto
    );

    return this.status(create_feed, res);
  }

  /**
   * UpdatePost
   * 
   * @param user_pk : jwt tokken
   * @param post_pk : 
   * @param Post_Update_DTO : PostDTO(title, text_content)
   * @param ImgDTO : ImageDTO(url)
   * @param null : 
   */
  private async UpdatePost(req, res) { 
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

    const Update_Feed = await this.post_service.UpdatePost(
      user_pk,
      feed_Info.post_pk,
      Post_Update_DTO,
      ImgDTO,
      null
    );

    return this.status(Update_Feed, res);
  }

  /**
   * DeletePost
   * 
   * @param user_pk : jwt tokken
   * @param post_pk :
   */  
  private async DeletePost(req, res) {
    const feed_Info = req.body;
    const post_pk = feed_Info.post_pk;
    const user_pk = res.locals.jwt_payload.pk;

    const Delete_Feed = await this.post_service.DeletePost(
      user_pk,
      post_pk
    );

    return this.status(Delete_Feed, res);
  }

}