/**
 *  게시물 좋아요 관련 라우트
 */
const express = require('express');
import { Response } from "express";
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

import sanitizeHtml from 'sanitize-html';

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostLikeService } from '../Services/LikeService';

@JsonController("/feedlike")
export class FeedLikeControl {

    constructor(private post_like_service: PostLikeService) {}

    @HttpCode(200)
    @Get()
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
        @Req() req,
        @Res() res: Response
    ) {

    const CountLike_Result = await this.post_like_service.CountLike(
        req.body.post_pk
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
    @Get('/:post_pk')
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
        @Param('post_pk') post_pk: string,
        @Req() req,
        @Res() res: Response
    ) {

    const WhoLike_Result = await this.post_like_service.WhoLike(
        post_pk,
        req.body.limit
    );

    if(!WhoLike_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return WhoLike_Result;
    }

    @HttpCode(200)
    @Get('/islike/:post_pk')
    @OpenAPI({
        summary: "IsLike",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async IsLike(
        @Req() req,
        @Res() res: Response
    ) {
    const user_pk = res.locals.jwt_payload.user_pk;

    const IsLike_Result = await this.post_like_service.IsLike(
        user_pk,
        req.body.post_pk
    );

    if(!IsLike_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return IsLike_Result;
    }

    

    @HttpCode(200)
    @Post('/togglelike')
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
    const user_pk = res.locals.jwt_payload.user_pk;

    const ToggleLike_Result = await this.post_like_service.ToggleLike(
        user_pk,
        req.body.feed_pk
    );

    if(!ToggleLike_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return ToggleLike_Result;
    }

}
