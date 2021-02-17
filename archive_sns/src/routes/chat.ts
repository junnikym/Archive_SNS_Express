/**
 * 채팅 관련 라우트
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';

import { ChatService } from '../services/ChatService';

export class ChatControl {

    public router;

    private chat_service : ChatService;

    constructor(
        chat_service : ChatService
    ) {

        this.chat_service = chat_service;

        this.router = express.Router();

        this.router.post(
            "/sendmsg", 
            VerifyAccessToken,
            async (req, res) => this.SendMsg(res, req)
        );

        this.router.get(
            "/:group_pk",
            VerifyAccessToken,
            this.GetChatContents
        );

        this.router.delete(
            "/exit", 
            VerifyAccessToken, 
            async (req, res) => this.ExitChatGroup(res, req)
        );

    }

    /**
     * SendMsg
     * @param req 
     * @param res 
     */
    private async SendMsg(req, res) {
        const s_account_pk = sanitizeHtml(res.locals.jwt_payload.pk);
        const s_group_pk = sanitizeHtml(req.body.group_pk);
        const s_content: string = sanitizeHtml(req.body.content);

        const ChatMsg_DTO = new ChatMsgDTO();
        ChatMsg_DTO.content = req.body.content;

        if(!ChatMsg_DTO.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "need Chat content"
            })
        }

        const SendMsg_Result = await this.chat_service.SendMsg(
            s_account_pk,
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

    private GetChatContents = async (req, res) => {

        const account_pk = res.locals.jwt_payload.pk;
        const group_pk = req.params.group_pk;

        const result = await this.chat_service.GetChatContents(group_pk, 0, 10);
        
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