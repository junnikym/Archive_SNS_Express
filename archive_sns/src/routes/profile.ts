/**
 * 프로필 관련 라우트
 */
const express = require('express');

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
     * 결과처리
     * 
     * @param result 라우트 처리 결과
     * @param res 상태 처리 결과
     */
    private status = function(result, res){
        if(!result){
            return res.status(403).send({
                status : 403,
                success : true,
                message : "Forbidden"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success"
        });  
    }

    /**
     * GetAccountByPK
     * 
     * @param email : user_Email
     */
    private async GetAccountByPk (req, res) {
        const user_Info = req.body;
        const user_Email = user_Info.email;

        const Get_Account = await this.account_service.GetAccountByPK(
            user_Email
        );

        return this.status(Get_Account, res);
    }

    /**
     * UpdateAccount
     * 
     * @param account_pk : 
     * @param Update_Profile : 
     * AccountDTO(email, password, name, profile_image, status_msg)
     */
    private async UpdateAccount(req, res) {
        const user_Info = req.body;
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

        return this.status(Update_Profile_result, res);
    }

}