/**
 * 채팅 관련 라우트
 */
import { Response } from "express";
import sanitizeHtml from 'sanitize-html';
import { VerifyAccessToken } from "../Middleware/JWT_Auth";
import { ChatMsgDTO } from '../Models/DTOs/ChatDTO';
import { ChatService } from '../Services/ChatService';

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

@JsonController("/chat")
export class ChatControl {
    constructor( private chat_service : ChatService ) {}

    @HttpCode(200)
    @Post("/sendmsg")
    @OpenAPI({
        summary: "SendMsg",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async SendMsg(
        @Body() ChatMsg_DTO: ChatMsgDTO,
        @Req() req,
        @Res() res: Response,
    ) {
        const user_pk = res.locals.jwt_payload.pk

        const SendMsg_Result = await this.chat_service.SendMsg(
            user_pk, 
            ChatMsg_DTO
        );

        if(!SendMsg_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to SendMsg"
            });

        const ws = req.app.get('socket_io');
        console.log(ws.socket.rooms);

        SendMsg_Result.notify.map( elem => {
            ws.io.to(elem.listener_pk).emit('chat_notify', elem);
        });
         //io.to(방의 아이디).emit('이벤트명', 데이터);

        return { data: SendMsg_Result };
    }

    @HttpCode(200)
    @Get('/:group_pk')
    @OpenAPI({
        summary: "Get Chat Contents",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async GetChatContents(
        @Param("group_pk") group_pk: string,
        @Res() res: Response
        ) {

        // @TODO : Service Motify
        const user_pk = res.locals.jwt_payload.pk;

        const GetChatContents_Result = await this.chat_service.GetChatContents(
            // user_pk,
            group_pk, 
            0, 
            10
        );

        if(!GetChatContents_Result){
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to GetChatContents"
            });
        }

        return { data: GetChatContents_Result };
    }

    @HttpCode(200)
    @Delete()
    @OpenAPI({
        summary: "GetChatContents",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async ExitChatGroup(
        @Body() body,
        @Res() res: Response
        ) {
        // @TODO : Service Motify
        const user_pk = res.locals.jwt_payload.pk;

        const ExitChatGroup_Result = await this.chat_service.ExitChatGroup(
            //user_pk,
            body.account_pk,
            body.group_pk
        );

        if(!ExitChatGroup_Result){
            return res.status(400).send({
            status: 400, 
            success: false, 
            message: "fail to ExitChatGroup"
            });
        }

        return { data: ExitChatGroup_Result };
    }
}