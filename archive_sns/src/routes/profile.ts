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
            '/:pk',
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
     * @param pk
     */
    private async GetAccountByPk (req, res) {
<<<<<<< HEAD
        const user_pk = req.params.pk;

        const Get_Account = await this.account_service.GetAccountByPK(
            user_pk
=======
        const s_user_Email = sanitizeHtml(req.body.email);

        const Get_Account = await this.account_service.GetAccountByPK(
            s_user_Email
>>>>>>> 18dc4e19d9017e3d3811e2f9c0c72ae9808dd1c6
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
        const s_email = sanitizeHtml(req.body.email);
        const s_password = sanitizeHtml(req.body.password);
        const s_name = sanitizeHtml(req.body.name);
        const s_profile_image = sanitizeHtml(req.body.profile_image);
        const s_status_msg = sanitizeHtml(req.body.status_msg);

        const s_account_pk = sanitizeHtml(req.body.account_pk);

        const Update_Profile = new AccountDTO();
        Update_Profile.email = s_email;
        Update_Profile.password = s_password;
        Update_Profile.name = s_name;
        Update_Profile.profile_image = s_profile_image;
        Update_Profile.status_msg = s_status_msg;

        const Update_Profile_result = await this.account_service.UpdateAccount(
            s_account_pk,
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
