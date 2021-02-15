/**
 *  피드 관련 라우트
 */
// const express = require('express');
import { Response } from "express";
import sanitizeHtml from 'sanitize-html';

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

// Multer middleware
import { PostImageMulter } from '../Middleware/Multer';
import { PostService } from "../services/PostService";
import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";
import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  Req,
  UseBefore,
  Res,
  Delete,
  HttpCode,
  QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController("/post")
export class PostControl {

  constructor( private post_service : PostService ) {

  /**
   * CreatePost
   * 
   * @param user_pk : jwt tokken
   * @param post_dto : PostDTO(title, text_content)
   * @param img_dto : ImageDTO(url)
   */
  private async CreatePost(req, res) {
    const s_title = sanitizeHtml(req.body.title);
    const s_content = sanitizeHtml(req.body.content);

    const user_pk = res.locals.jwt_payload.pk;

    const images_data = req.files;
    const path = images_data.map(img => img.path);

    if(images_data === undefined) 
      return res.tatus(400).send({
				status: 400, 
				success: false, 
				message: "not exist image"
			});
    
    // < Post DTO >
    const post_dto = new PostDTO();

    post_dto.title        = s_title;
    post_dto.text_content = s_content;

    // < Image DTOs >
    const img_dto = [];
    
    path.map(img_path => {
      const new_dto = new ImageDTO;
      new_dto.url = img_path;
			img_dto.push(new_dto);
    });

    // < Generate >
    const result = await this.post_service.CreatePost(
      user_pk, post_dto, img_dto
      );

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

  

  @HttpCode(200)
  @Post()
  @OpenAPI({
    summary: "CreatePost",
    statusCode: "200",
    security: [{ bearerAuth: [] }],
  })
  @UseBefore(VerifyAccessToken)
  public async CreatePost(
    @Body() post_dto: PostDTO,
    @Res() res: Response,
  ) {
    const user_pk = res.locals.jwt_payload.pk;

    const CreatePost_Result = await this.post_service.CreatePost(
      user_pk, 
      post_dto, 
      img_dto
      );

    if(!CreatePost_Result)
    return res.status(400).send({
      status: 400, 
      success: false, 
      message: "fail to create"
    });

    return CreatePost_Result;
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
    const s_title = sanitizeHtml(req.body.title);
    const s_text_content = sanitizeHtml(req.body.text_content);


    const feed_Info = req.body;
    const user_pk = res.locals.jwt_payload.pk;

    const Post_Update_DTO = new PostDTO();
    Post_Update_DTO.title = s_title;
    Post_Update_DTO.text_content = s_text_content;

    let ImgDTO: ImageDTO[];
    
    for(let i = 0; i < feed_Info.url.Length; i++) {
      const temp_img_dto = new ImageDTO;
      temp_img_dto.url = feed_Info.url;

      ImgDTO.push(temp_img_dto);
    }

    if(!ImgDTO){
      return res.status(400).send({
        status : 400,
        success : true,
        message : "image error",
      })
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
    const s_post_pk = sanitizeHtml(req.body.post_pk);

    const user_pk = res.locals.jwt_payload.pk;

    const Delete_Feed = await this.post_service.DeletePost(
      user_pk,
      s_post_pk
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

  /**
   * GetSinglePost
   * 
   * @param post_pk : 
   */
  private async GetSinglePost(req, res) {
    const s_post_pk = sanitizeHtml(req.params.post_pk);

    const Get_SinglePost_Result = await this.post_service.GetSinglePost(
      s_post_pk
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
    const s_offset = sanitizeHtml(req.body.offset);
    const s_limit = sanitizeHtml(req.body.limit);
    const s_order_by = sanitizeHtml(req.body.order_by);

    const GetPostList_Result =  await this.post_service.GetPostList(
      s_offset,
      s_limit,
      s_order_by
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
    const s_witer_pk = sanitizeHtml(req.params.witer_pk);
    const s_offset = sanitizeHtml(req.body.offset);
    const s_limit = sanitizeHtml(req.body.limit);

    const Get_OwnPost_Result = await this.post_service.GetOwnPost(
      s_witer_pk,
      s_offset,
      s_limit
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

}