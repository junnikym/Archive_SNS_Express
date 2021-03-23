/**
 *  friend 관련 라우트
 */
import { Request, Response } from "express";
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
// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";
import { FriendService } from "../Services/FriendService";
import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";
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
        @Req() req: Request,
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
        Friend_DTO,
        req.body.listener_pk
    );

    if(!AddFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    const ws = req.app.get('socket_io');
        console.log(ws.socket.rooms);

    AddFriend_Result.notify.map( elem => {
        ws.io.to(elem.listener_pk).emit('friend_notify', elem);
    });

    return { data : AddFriend_Result };
}

@HttpCode(200)
    @Get('/friendlist')
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
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const GetFriendList_Result = await this.FriendService.GetFriendList(
            user_pk
        );

        if(!GetFriendList_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : GetFriendList_Result };
    }

@HttpCode(200)
    @Get('/sendlist')
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
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const GetSendList_Result = await this.FriendService.GetSendList(
            user_pk
        );

        if(!GetSendList_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : GetSendList_Result };
    }

@HttpCode(200)
    @Get('/receivelist')
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
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const GetReceiveList_Result = await this.FriendService.GetReceiveList(
            user_pk
        );

        if(!GetReceiveList_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : GetReceiveList_Result };
    }

@HttpCode(200)
    @Post('/accept')
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
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const AcceptFriend_Result = await this.FriendService.AcceptFriend(
            user_pk,
            body.request_pk
        );

        if(!AcceptFriend_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : AcceptFriend_Result };
    }

@HttpCode(200)
    @Post('/reject')
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
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const RejectFriend_Result = await this.FriendService.RejectFriend(
            user_pk,
            body.request_pk
        );

        if(!RejectFriend_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : RejectFriend_Result };
    }

@HttpCode(200)
    @Delete('/delete')
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
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const DeleteFriend_Result = await this.FriendService.DeleteFriend(
            user_pk,
            body.request_pk
        );

        if(!DeleteFriend_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return { data : DeleteFriend_Result };
    }
}