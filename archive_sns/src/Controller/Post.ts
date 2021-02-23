/**
 *  피드 관련 라우트
 */
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

    return { data : CreatePost_Result };
  }

  @HttpCode(200)
  @Put("/:post_pk")
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
    @Param("post_pk") post_pk: string,
    @Body() Post_Update_DTO: PostDTO,
    @Body() body,
    @Res() res: Response,
  ) {
    const user_pk = res.locals.jwt_payload.pk;
    const del_img_list = body.del_img_list

    let ImgDTO: ImageDTO[];
    
    for(let i = 0; i < body.url.Length; i++) {
      const temp_img_dto = new ImageDTO;
      temp_img_dto.url = body.url;

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
      post_pk,
      Post_Update_DTO,
      ImgDTO,
      del_img_list
    );

    if (!UpdatePost_Result) {
      return res
        .status(403)
        .send({ message: "Post를 수정할 권한이 없습니다." });
    }

    return { data : UpdatePost_Result };
  }

  @HttpCode(200)
  @Delete("/:post_pk")
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
    @Param("post_pk") post_pk: string, 
    @Res() res: Response
    ) {
    const user_pk = res.locals.jwt_payload.pk;

    const DeletePost_Result = await this.post_service.DeletePost(
      user_pk,
      post_pk
    );

    if(!DeletePost_Result){
      return res.status(400).send({
          status : 400,
          success : false,
          message : "Bad Request"
      });
    };

    return { data : DeletePost_Result };
  }
  
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
    
    if(!Get_SinglePost_Result){
      return res.status(400).send({
          status : 400,
          success : false,
          message : "Bad Request"
      });
    };

    return { data : Get_SinglePost_Result };
  }

  @HttpCode(200)
  @Get()
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
      return res.status(204).send('no post list');
    }

    if(!GetPostList_Result){
      return res.status(400).send({
          status : 400,
          success : false,
          message : "Bad Request"
      });
    };

    return { data : GetPostList_Result };
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
    @Body() body,
    @Res() res: Response,
  ) {
    const GetPostList_Result =  await this.post_service.GetOwnPost(
      witer_pk,
      body.offset,
      body.limit
    );
    
    if(GetPostList_Result.length === 0) {
      return res.status(204).send('no post');
    }

    if(!GetPostList_Result){
      return res.status(400).send({
          status : 400,
          success : false,
          message : "Bad Request"
      });
    };

    return { data : GetPostList_Result };
  }
}