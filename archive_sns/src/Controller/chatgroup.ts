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
import { ChatGroupService } from "../Services/GroupService";
import { GroupDTO } from '../Models/DTOs/GroupDTO';

@JsonController("/chatgroup")
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
        @Res() res: Response,
    ) {

        const CreateGroup_Result = 
            await this.Chat_GroupService.CreateGroup(Group_DTO);

        if(!CreateGroup_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to CreateGroup"
            });

        return { data : CreateGroup_Result };
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
            user_pk,
            group_pk
        )
        
        // @TODO : Status
        if(!DeleteGroup_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to Delete Group"
            });

        return { data : DeleteGroup_Result };
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
        @Body() Group_DTO: GroupDTO,
        @Res() res: Response
    ) {

        const Invite_Result = 
            await this.Chat_GroupService.Invite( Group_DTO );
        
        if(!Invite_Result)
            return res.status(400).send({
                status: 400, 
                success: false, 
                message: "fail to DeleteGroup"
            });

        return { data : Invite_Result };
    }
}