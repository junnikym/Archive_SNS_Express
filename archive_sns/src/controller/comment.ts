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

const express = require('express');
import sanitizeHtml from 'sanitize-html';
import { VerifyAccessToken } from "../Middleware/JWT_Auth";
import { CommentDTO } from '../Models/DTOs/CommentDTO';
import { PostCommentService } from '../services/CommentService';

@JsonController("/comment")
export class CommentControl {

    constructor( private post_comment_service : PostCommentService ) {}

    /**
     * TEST
     * @param req 
     * @param res 
     */
    private TestComment(req, res) {
        const form = `
        <form action='/comment/create' method='post'>
            <p>
                <textarea name="user_pk"></textarea>
            </p>
            </p>
                <textarea name="content"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `;
        return res.send(form);
    }

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "GetPostComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetPostComment(
        @Req() req,
        @Res() res: Response
    ) {
        
        const GetPostComment = await this.post_comment_service.GetPostComment(
            req.body.post_pk,
            req.body.offset,
            req.body.limit,
            req.body.order_by
        );

        if(!GetPostComment)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to GetPostComment"
        });

        return GetPostComment;
    }

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "CreateComment",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async CreateComment(
        @Body() Comment_DTO: CommentDTO,
        @Req() req,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        if(!Comment_DTO.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "need Comment Content"
            });
        }

        const CreateComment_Result = await this.post_comment_service.CreateComment(
            user_pk,
            req.body.post_pk,
            Comment_DTO
        )

        if(!CreateComment_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return CreateComment_Result;
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
        @Req() req,
        @Res() res: Response
    ) {
        if(!Comment_DTO.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "no Comment_DTO Content"
            });
        }

        const user_pk = res.locals.jwt_payload.pk;

        const UpdateComment_Result = await this.post_comment_service.UpdateComment(
            user_pk,
            req.body.comment_pk,
            Comment_DTO
        )

        if(!UpdateComment_Result)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to UpdateComment"
        });

        return UpdateComment_Result;
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
        @Req() req,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const DeleteComment_Result = await this.post_comment_service.DeleteComment(
            user_pk,
            req.body.comment_pk
        )

        if(!DeleteComment_Result)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to DeleteComment"
        });

        return DeleteComment_Result;
    }
}