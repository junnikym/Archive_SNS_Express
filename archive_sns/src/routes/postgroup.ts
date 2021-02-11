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

import { PostGroupService } from "../services/GroupService";

import { GroupDTO } from '../Models/DTOs/GroupDTO';

export class GroupControl {

    public router;
    private PostGroup_Service : PostGroupService;

    constructor(
        PostGroup_Service : PostGroupService
    ) {

        this.PostGroup_Service = PostGroup_Service;

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
        const s_req = sanitizeHtml(req);

        const Group_DTO = new GroupDTO();
        Group_DTO.title = s_req.body.title;

        if(!Group_DTO.title){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "no group title"
            });
        };

        const member_pk_list: string[] = req.body.member_pk_list;

        const CreateGroup_Result = await this.PostGroup_Service.CreateGroup(
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

        return res.status(200).send({
            status : 200,
            success : true,
            message : "success",
            data :  CreateGroup_Result
        });
    }

    private async DeleteGroup(req, res) {
        const s_req = sanitizeHtml(req);

        const group_pk: string = s_req.params.group_pk;

        const DeleteGroup_Result = await this.PostGroup_Service.DeleteGroup(
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
        const s_req = sanitizeHtml(req);

        const group_pk: string = s_req.params.group_pk;
        const member_pk_list: string[] = s_req.body.member_pk_list;

        const Invite_Result = await this.PostGroup_Service.Invite(
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
            data : Invite_Result
        });
    }

}