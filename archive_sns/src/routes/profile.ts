/**
 * 프로필 관련 라우트
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { AccountService } from '../services/AccountService';
import { Account } from '../Models/Entities/Account';
import { AccountDTO } from '../Models/DTOs/AccountDTO';

export class ProfileControl {

    public router

    private account_service : AccountService;

    constructor(
        account_service : AccountService
    ) {
        this.account_service = account_service;

        this.router = express.Router();

        this.router.get(
            '/',
            async (req, res) => this.GetAccountByPk(req, res)
        );

        this.router.put(
            '/:usernum',
            async (req, res) => this.UpdateAccount(req, res)
        );
    }

    /**
     * GetAccountByPK
     * 
     * @param email : user_Email
     */
    private async GetAccountByPk (req, res) {
        const s_req = sanitizeHtml(req);

        const user_Info = s_req.body;
        const user_Email = user_Info.email;

        const Get_Account = await this.account_service.GetAccountByPK(
            user_Email
        );

        if(!Get_Account){
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
            data : Get_Account
        });
    }

    /**
     * UpdateAccount
     * 
     * @param account_pk : 
     * @param Update_Profile : 
     * AccountDTO(email, password, name, profile_image, status_msg)
     */
    private async UpdateAccount(req, res) {
        const s_req = sanitizeHtml(req);

        const user_Info = s_req.body;
        const account_pk = user_Info.account_pk;

        const Update_Profile = new AccountDTO();
        Update_Profile.email = user_Info.email;
        Update_Profile.password = user_Info.password;
        Update_Profile.name = user_Info.name;
        Update_Profile.profile_image = user_Info.profile_image;
        Update_Profile.status_msg = user_Info.status_msg;

        const Update_Profile_result = await this.account_service.UpdateAccount(
            account_pk,
            Update_Profile
        );

        if(!Update_Profile_result){
            return res.status(403).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success",
            data : Update_Profile_result
        });
    }

}
