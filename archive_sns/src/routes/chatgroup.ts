/**
 *  그룹 관련 라우트
 */

const express = require('express');

// JWT middleware
import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { ChatGroupService } from "../services/GroupService";

import { GroupDTO } from '../Models/DTOs/GroupDTO';

export class GroupControl {

    public router;
    private Chat_GroupService : ChatGroupService;

    constructor(
        Chat_GroupService : ChatGroupService
    ) {

        this.Chat_GroupService = Chat_GroupService;

        this.router = express.Router();

        this.router.post(
            '/', 
            async (req, res) => this.CreateGroup(req, res)
        );

        this.router.delete(
            '/:group_pk', 
            async (req, res) => this.DeleteGroup(req, res)
        );

        this.router.get(
            '/invite/:group_pk', 
            async (req, res) => this.Invite(req, res)
        );

    }

    private async CreateGroup(req, res) {

        const Group_DTO = new GroupDTO();
        Group_DTO.title = req.body.title;

        const member_pk_list: string[] = req.body.member_pk_list;

        const CreateGroup_Result = await this.Chat_GroupService.CreateGroup(
            Group_DTO,
            member_pk_list
        )
        
        if(!CreateGroup_Result){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return res.status(201).send({
            status : 201,
            success : true,
            message : "Created",
            data : {
                CreateGroup_Result
            }
        });
    }

    private async DeleteGroup(req, res) {

        const group_pk: string = req.params.group_pk;

        const DeleteGroup_Result = await this.Chat_GroupService.DeleteGroup(
            group_pk
        )
        
        if(!DeleteGroup_Result){
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

    private async Invite(req, res) {
        const group_pk: string = req.params.group_pk;
        const member_pk_list: string[] = req.body.member_pk_list;

        const Invite_Result = await this.Chat_GroupService.Invite(
            group_pk,
            member_pk_list
        )

        if(!Invite_Result){
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
            data : {
                Invite_Result
            }
        });
    }

}