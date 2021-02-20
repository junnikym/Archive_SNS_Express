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
import { PostService } from "../Services/PostService";
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

  constructor( private post_service : PostService ) {}

  @HttpCode(200)
  @Post("/create")
  @OpenAPI({
    summary: "CreatePost",
    statusCode: "200",
    security: [{ bearerAuth: [] }],
  })
  @UseBefore(PostImageMulter.array('image', 30))
  @UseBefore(VerifyAccessToken)
  public async CreatePost(
    @Body() post_dto: PostDTO,
    @Req() req,
    @Res() res: Response,
  ) {
    const user_pk = res.locals.jwt_payload.pk;
    const path = req.files.map(img => img.path);

    const img_dto = [];
    path.map(img_path => {
      const new_dto = new ImageDTO;
      new_dto.url = img_path;
      img_dto.push(new_dto);
    });
    
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

    return {data : CreatePost_Result};
  }

  @HttpCode(200)
  @Put("/:postpk")
  @OpenAPI({
    summary: "UpdatePost",
    statusCode: "200",
    responses: {
      "403": {
        description: "Forbidden",
      },
    },
    security: [{ bearerAuth: [] }],
  })
  @UseBefore(VerifyAccessToken)
  public async UpdatePost(
    @Param("postpk") postpk: string,
    @Body() Post_Update_DTO: PostDTO,
    @Req() req,
    @Res() res: Response,
  ) {
    const data = postpk + Post_Update_DTO + req + res;
    console.log(data);

    const feed_Info = req.body;
    const user_pk = res.locals.jwt_payload.pk;

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

    const UpdatePost_Result = await this.post_service.UpdatePost(
      user_pk,
      postpk,
      Post_Update_DTO,
      ImgDTO,
      null  //??
    );

    if (!UpdatePost_Result) {
      return res
        .status(403)
        .send({ message: "Post를 수정할 권한이 없습니다." });
    }

    console.log(UpdatePost_Result);
    return UpdatePost_Result;
  }

  /**
   * DeletePost
   * @param postpk 
   * @param res 
   */
  @HttpCode(200)
  @Delete("/:postpk")
  @OpenAPI({
    summary: "DeletePost",
    statusCode: "200",
    responses: {
      "403": {
        description: "Forbidden",
      },
    },
    security: [{ bearerAuth: [] }],
  })
  @UseBefore(VerifyAccessToken)
  public async DeletePost(
    @Param("postpk") postpk: string, 
    @Res() res: Response
    ) {
    const data = postpk + res;
    console.log(data);
    const user_pk = res.locals.jwt_payload.pk;

    const DeletePost_Result = await this.post_service.DeletePost(
      user_pk,
      postpk
    );

    if (!DeletePost_Result) {
      return res
      .status(403)
      .send({ message: "Post를 삭제할 권한이 없습니다." });
    }

    console.log(DeletePost_Result);
    return DeletePost_Result;
  }

  /**
   * GetSinglePost
   * @param req 
   * @param res 
   */
  @HttpCode(200)
  @Get("/:post_pk")
  @OpenAPI({
    summary: "GetSinglePost",
    statusCode: "200",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  public async GetSinglePost(
    @Param("post_pk") post_pk,
    @Res() res: Response,
  ) {
    const Get_SinglePost_Result =  await this.post_service.GetSinglePost(
      post_pk
    );
    
    if (!Get_SinglePost_Result) {
      return res.status(400).send(Get_SinglePost_Result);
    }

    return Get_SinglePost_Result;
  }

  @HttpCode(200)
  @Post()
  @OpenAPI({
    summary: "Post 목록 조회",
    statusCode: "200",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  public async GetPostList(
    @Body() body,
    @Res() res: Response,
  ) {
    const GetPostList_Result = await this.post_service.GetPostList(
      body.offset,
      body.limit,
      body.order_by
    );
    
    if (GetPostList_Result.length === 0) {
      return res.status(204).send(GetPostList_Result);
    }

    return {data : GetPostList_Result};
  }

  @HttpCode(200)
  @Get("/:witer_pk")
  @OpenAPI({
    summary: "GetOwnPost",
    statusCode: "200",
    responses: {
      "204": {
        description: "No Content",
      },
    },
  })
  public async GetOwnPost(
    @Param("witer_pk") witer_pk,
    @Req() req,
    @Res() res: Response,
  ) {
    const GetPostList_Result =  await this.post_service.GetPostList(
      witer_pk,
      req.body.offset,
      req.body.limit
    );
    
    // if(GetPostList_Result.length === 0) {
      // return res.status(204).send(GetPostList_Result);
    // }

    return GetPostList_Result;
  }
}