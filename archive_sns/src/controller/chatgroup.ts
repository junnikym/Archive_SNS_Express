/**
 *  그룹 관련 라우트
 */
import { Response } from "express";
import sanitizeHtml from 'sanitize-html';

// JWT middleware
import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";
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
import { ChatGroupService } from "../services/GroupService";
import { GroupDTO } from '../Models/DTOs/GroupDTO';

export class GroupControl {

    constructor( private Chat_GroupService : ChatGroupService ) {}

    @HttpCode(200)
    @Post()
    @OpenAPI({
        summary: "CreateGroup",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async CreateGroup(
        @Body() Group_DTO: GroupDTO,
        @Req() req,
        @Res() res: Response,
    ) {
        if(!Group_DTO.title){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "no Group_DTO title"
            });
        }

        const CreateGroup_Result = await this.Chat_GroupService.CreateGroup(
            Group_DTO,
            req.body.member_pk_list
        );

        if(!CreateGroup_Result)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to CreateGroup"
        });

        return CreateGroup_Result;
    }

    @HttpCode(200)
    @Delete('/:group_pk')
    @OpenAPI({
        summary: "DeleteGroup",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async DeleteGroup(
        @Param("group_pk") group_pk: string,
        @Res() res: Response,
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const DeleteGroup_Result = await this.Chat_GroupService.DeleteGroup(
            group_pk
        )
        
        if(!DeleteGroup_Result)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to CreateGroup"
        });

        return DeleteGroup_Result;
    }

    @HttpCode(200)
    @Get('/invite')
    @OpenAPI({
        summary: "Invite",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async Invite(
        @Req() req,
        @Res() res: Response
    ) {
        const group_pk: string = req.body.group_pk;
        const member_pk_list: string[]= req.body.member_pk_list;

        const Invite_Result = await this.Chat_GroupService.Invite(
            group_pk,
            member_pk_list
        )
        
        if(!Invite_Result)
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to DeleteGroup"
        });

        return Invite_Result;
    }
}