/**
 * 채팅 관련 라우트
 */

const express = require('express');

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';

import { ChatService } from '../services/ChatService';

export class CommentControl {

    public router;

    private Chat_service : ChatService;

    constructor(
        Chat_service : ChatService
    ) {

        this.Chat_service = Chat_service;

        this.router = express.Router();

        this.router.post(
            "/sendmsg", 
            async (req, res) => this.SendMsg(res, req)
        );

        this.router.delete(
            "/exit", 
            async (req, res) => this.ExitChatGroup(res, req)
        );

    }

    /**
     * SendMsg
     * @param req 
     * @param res 
     */
    private async SendMsg(req, res) {
        const account_pk = req.body.account_pk;
        const group_pk = req.body.group_pk;

        const ChatMsg_DTO = new ChatMsgDTO();
        ChatMsg_DTO.content = req.body.content;

        if(!ChatMsg_DTO.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "need Chat content"
            })
        }

        const SendMsg_Result = await this.Chat_service.SendMsg(
            account_pk,
            group_pk,
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
            message : "success"
        });
    }

    /**
     * ExitChatGroup
     * @param req 
     * @param res 
     */
    private async ExitChatGroup(req, res) {
        const account_pk = req.body.account_pk;
        const group_pk = req.body.group_pk;

        const ExitChatGroup_Result = await this.Chat_service.ExitChatGroup(
            account_pk,
            group_pk
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