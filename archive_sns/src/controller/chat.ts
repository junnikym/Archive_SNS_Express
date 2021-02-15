/**
 * 채팅 관련 라우트
 */
// const express = require('express');
import { Response } from "express";
import sanitizeHtml from 'sanitize-html';
import { VerifyAccessToken } from "../Middleware/JWT_Auth";
import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';
import { ChatService } from '../services/ChatService';

import {
    JsonController,
    Get,
    Param,
    Body,
    Post,
    Put,
    UseBefore,
    Res,
    Delete,
    HttpCode,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

export class ChatControl {
    constructor( chat_service : ChatService ) {}

    /**
     * SendMsg
     * @param req 
     * @param res 
     */
    private SendMsg = async (res, req) => {

        const account_pk = res.locals.jwt_payload.pk;
        const s_group_pk = sanitizeHtml(req.body.group_pk);

        const ChatMsg_DTO = new ChatMsgDTO;
        ChatMsg_DTO.content = sanitizeHtml(req.body.content);

        const SendMsg_Result = await this.chat_service.SendMsg(
            account_pk,
            s_group_pk,
            ChatMsg_DTO
        );

        if(!SendMsg_Result){
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
            data: SendMsg_Result
        });
    }


    // @HttpCode(200)
    // @Post()
    // @OpenAPI({
    //     summary: "SendMsg",
    //     statusCode: "200",
    //     security: [{ bearerAuth: [] }],
    // })
    // @UseBefore(VerifyAccessToken)

    // public async SendMsg(
    //     @Body() ChatMsg_DTO: ChatMsgDTO,
    //     @Res() res: Response,
    // ) {
    //     const user_pk = res.locals.jwt_payload.pk;

    //     const CreatePost_Result = await this.post_service.CreatePost(
    //     user_pk, 
    //     post_dto, 
    //     img_dto
    //     );

    //     if(!CreatePost_Result)
    //     return res.status(400).send({
    //     status: 400, 
    //     success: false, 
    //     message: "fail to create"
    //     });

    //     return CreatePost_Result;
    // }


    private GetChatContents = async (req, res) => {

        const account_pk = res.locals.jwt_payload.pk;
        const s_group_pk = sanitizeHtml(req.params.group_pk);

        const result = await this.chat_service.GetChatContents(s_group_pk, 0, 10);
        
        if(!result){
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
            data : result
        });

    }

    /**
     * ExitChatGroup
     * @param req 
     * @param res 
     */
    private async ExitChatGroup(req, res) {
        const s_account_pk = sanitizeHtml(req.body.account_pk);
        const s_group_pk = sanitizeHtml(req.body.group_pk);

        const ExitChatGroup_Result = await this.chat_service.ExitChatGroup(
            s_account_pk,
            s_group_pk
        );

        if(!ExitChatGroup_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return res.status(200).send({
            status : 200,
            success : true,
            message : "success"
        });
    }

}