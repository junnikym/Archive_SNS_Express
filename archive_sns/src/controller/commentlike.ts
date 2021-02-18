/**
 *  게시물 좋아요 관련 라우트
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

import { CommentLikeService } from "../Services/LikeService";

@JsonController("/commentlike")
export class CommentLikeControl {

    constructor(private comment_like_service: CommentLikeService) {}

    @HttpCode(200)
    @Get("/:comment_pk")
    @OpenAPI({
        summary: "CountLike",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async CountLike(
        @Param("comment_pk") comment_pk: string, 
        @Res() res: Response
    ) {
        const CountLike_Result = await this.comment_like_service.CountLike(
            comment_pk
        );

        if(!CountLike_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return CountLike_Result;
    }

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "WhoLike",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async WhoLike(
        @Req() req,
        @Res() res: Response
    ) {
        const Who_Like = await this.comment_like_service.WhoLike(
            req.body.comment_pk,
            req.body.limit
        );

        if(!Who_Like){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return Who_Like;
    }

    @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "ToggleLike",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async ToggleLike(
        @Req() req,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const Who_Like = await this.comment_like_service.WhoLike(
            user_pk,
            req.body.comment_pk
        );

        if(!Who_Like){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return Who_Like;
    }
}
