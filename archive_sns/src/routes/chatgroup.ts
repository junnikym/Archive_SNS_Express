/**
 *  그룹 관련 라우트
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

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
        const s_title: string = sanitizeHtml(req.body.title);
        const s_member_pk_list = sanitizeHtml(req.body.member_pk_list);


        const Group_DTO = new GroupDTO();
        Group_DTO.title = s_title

        const member_pk_list: string[] = s_member_pk_list;

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
            data : CreateGroup_Result
        });
    }

    private async DeleteGroup(req, res) {
        const s_group_pk: string = sanitizeHtml(req.params.group_pk);

        const DeleteGroup_Result = await this.Chat_GroupService.DeleteGroup(
            s_group_pk
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
        const s_group_pk: string = sanitizeHtml(req.params.group_pk);
        const s_member_pk_list: string[]= sanitizeHtml(req.params.member_pk_list);

        const Invite_Result = await this.Chat_GroupService.Invite(
            s_group_pk,
            s_member_pk_list
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
            data : Invite_Result
        });
    }

}