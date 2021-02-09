/**
 *  피드 관련 라우트
 */

const express = require('express');

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

// Multer middleware
import { PostImageMulter } from '../Middleware/Multer';

import { PostService } from "../services/PostService";

import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";

import { Post } from '../Models/Entities/Post';
import { Image } from '../Models/Entities/Image';
import { json } from "body-parser";

export class PostControl {

  public router;
  private post_service : PostService;

  constructor(
    post_service : PostService,
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
      PostImageMulter.array('image', 30),
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
   * GetSinglePost
   * 
   * @param post_pk : 
   */
  private async GetSinglePost(req, res) {
    const post_pk = req.params.post_pk;

    const Get_SinglePost_Result = await this.post_service.GetSinglePost(
      post_pk
    );
    
    if(!Get_SinglePost_Result){
      return res.status(400).send({
        status : 400,
        success : false,
        message : "Bad Request"
      });
    };
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data :  Get_SinglePost_Result
    });
  }

  /**
   * GetPostList
   * 
   * @param 
   */
  private async GetPostList(req, res) {

    const GetPostList_Result =  await this.post_service.GetPostList(
      req.body.offset,
      req.body.limit,
      req.body.order_by
    );

    if(!GetPostList_Result){
      return res.status(400).send({
        status : 400,
        success : false,
        message : "Bad Request"
      });
    };
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : GetPostList_Result
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

    if(!Get_OwnPost_Result){
      return res.status(400).send({
        status : 400,
        success : false,
        message : "Bad Request"
      });
    };
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : Get_OwnPost_Result
    });
  }

  /**
   * CreatePost
   * 
   * @param user_pk : jwt tokken
   * @param post_dto : PostDTO(title, text_content)
   * @param img_dto : ImageDTO(url)
   */

  private async CreatePost(req, res) {
    const image_req = req.files;
    const path = image_req.map(img => img.path);
    const user_pk = res.locals.jwt_payload.pk;

    if(image_req === undefined) 
      return res.tatus(400).send({
				status: 400, 
				success: false, 
				message: "not exist image"
			});
    
    // < Post DTO >
    const post_dto = new PostDTO();

    post_dto.title        = req.body.title;
    post_dto.text_content = req.body.content; 

    // < Image DTOs >
    const img_dto = [];
    
    path.map(img_path => {
      const new_dto = new ImageDTO;
      new_dto.url = img_path;
			img_dto.push(new_dto);
    });

    // < Generate >
    const result = await this.post_service.CreatePost(user_pk, post_dto, img_dto);

    if(!result)
      return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to create"
      });

    return res.status(200).send({
      status: 200,
			success: true,
			message: "success",
			data: result
    });
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

    if(!Update_Feed){
      return res.status(403).send({
        status : 403,
        success : false,
        message : "Forbidden"
      });
    };
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : Update_Feed
    });
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

    if(!Delete_Feed){
      return res.status(403).send({
        status : 403,
        success : false,
        message : "Forbidden"
      });
    };
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success"
    });
  }

}