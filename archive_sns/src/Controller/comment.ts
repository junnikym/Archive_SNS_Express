/**
 * 댓글 관련 라우트 생성,삭제,수정
 */
import { Response } from "express";
import {
    JsonController,
    Get,
    Param,
    Body,
    Post,
    Put,
    UseBefore,
    Req,
    Res,
    Delete,
    HttpCode,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import sanitizeHtml from 'sanitize-html';
import { VerifyAccessToken } from "../Middleware/JWT_Auth";
import { CommentDTO, PostCommentDTO } from '../Models/DTOs/CommentDTO';
import { PostCommentService } from '../Services/CommentService';

@JsonController("/comment")
export class CommentControl {

    constructor( private post_comment_service : PostCommentService ) {}

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "GetPostComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetPostComment(
        @Body() body,
        @Res() res: Response
    ) {
        
        const GetPostComment = await this.post_comment_service.GetPostComment(
            body.post_pk,
            body.offset,
            body.limit,
            body.order_by
        );

        if(!GetPostComment)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to GetPostComment"
            });

        return { data : GetPostComment };
    }

    @HttpCode(200)
    @Post()
    @OpenAPI({
        summary: "CreateComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async CreateComment(
        @Body() PostComment_DTO: PostCommentDTO,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const CreateComment_Result = await this.post_comment_service.CreateComment(
            user_pk,
            PostComment_DTO
        )

        if(!CreateComment_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : CreateComment_Result};
    }

    @HttpCode(200)
    @Put()
    @OpenAPI({
        summary: "UpdateComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async UpdateComment(
        @Body() Comment_DTO: CommentDTO,
        @Res() res: Response
    ) {

        const user_pk = res.locals.jwt_payload.pk;

        const UpdateComment_Result = await this.post_comment_service.UpdateComment(
            user_pk,
            Comment_DTO
        )

        if(!UpdateComment_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to UpdateComment"
            });

        return { data : UpdateComment_Result };
    }

    @HttpCode(200)
    @Delete()
    @OpenAPI({
        summary: "DeleteComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async DeleteComment(
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const DeleteComment_Result = await this.post_comment_service.DeleteComment(
            user_pk, body.comment_pk
        )

        if(!DeleteComment_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to DeleteComment"
            });

        return { data : DeleteComment_Result };
    }
}