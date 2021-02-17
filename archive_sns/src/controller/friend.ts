/**
 *  friend 관련 라우트
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
    UseBefore,
    Req,
    Res,
    Delete,
    HttpCode,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import sanitizeHtml from 'sanitize-html';

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { FriendService } from "../services/FriendService";

import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";

// import { Post } from '../Models/Entities/Post';
import { FriendDTO } from "../Models/DTOs/FriendDTO";

@JsonController("/friend")
export class FriendControl {
    constructor( private FriendService : FriendService ) {}

@HttpCode(200)
    @Post()
    @OpenAPI({
        summary: "AddFriend",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async AddFriend(
        @Body() Friend_DTO: FriendDTO,
        @Res() res: Response
    ) {
    if(!Friend_DTO.account_pk || !Friend_DTO.friend_pk){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "no pk"
        })
    }

    const AddFriend_Result = await this.FriendService.AddFriend(
        Friend_DTO
    );

    if(!AddFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return AddFriend_Result;
}

@HttpCode(200)
    @Get('/friendlist/:account_pk')
    @OpenAPI({
        summary: "GetFriendList",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetFriendList(
        @Param('account_pk') account_pk,
        @Res() res: Response
    ) {
    
    const GetFriendList_Result = await this.FriendService.GetFriendList(
        account_pk
    );

    if(!GetFriendList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return GetFriendList_Result;
}

@HttpCode(200)
    @Get('/sendlist/:account_pk')
    @OpenAPI({
        summary: "GetSendList",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetSendList(
        @Param('account_pk') account_pk,
        @Res() res: Response
    ) {
    
    const GetSendList_Result = await this.FriendService.GetSendList(
        account_pk
    );

    if(!GetSendList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return GetSendList_Result;
}

@HttpCode(200)
    @Get('/receivelist/:account_pk')
    @OpenAPI({
        summary: "GetReceiveList",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetReceiveList(
        @Param('account_pk') account_pk,
        @Res() res: Response
    ) {
    
    const GetReceiveList_Result = await this.FriendService.GetReceiveList(
        account_pk
    );

    if(!GetReceiveList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return GetReceiveList_Result;
}

@HttpCode(200)
    @Get('/accept')
    @OpenAPI({
        summary: "AcceptFriend",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async AcceptFriend(
        @Req() req,
        @Res() res: Response
    ) {
    
    const AcceptFriend_Result = await this.FriendService.AcceptFriend(
        req.body.account_pk,
        req.body.request_pk
    );

    if(!AcceptFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return AcceptFriend_Result;
}

@HttpCode(200)
    @Get('/reject')
    @OpenAPI({
        summary: "RejectFriend",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async RejectFriend(
        @Req() req,
        @Res() res: Response
    ) {
    
    const RejectFriend_Result = await this.FriendService.RejectFriend(
        req.body.account_pk,
        req.body.request_pk
    );

    if(!RejectFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return RejectFriend_Result;
}

@HttpCode(200)
    @Get('/delete')
    @OpenAPI({
        summary: "DeleteFriend",
        statusCode: "200",
        responses: {
            "403": {
                description: "Forbidden",
            },
        },
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async DeleteFriend(
        @Req() req,
        @Res() res: Response
    ) {
    
    const DeleteFriend_Result = await this.FriendService.DeleteFriend(
        req.body.account_pk,
        req.body.request_pk
    );

    if(!DeleteFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return DeleteFriend_Result;
}

}