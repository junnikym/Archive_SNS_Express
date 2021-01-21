/**
 * 프로필 관련 라우트
 */
import * as express from "express";
var router = express.Router();

import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { AccountService } from "../services/AccountService";

/**
 * 프로필 확인
 */
router.get(
    '/', 
    async function(req, res) {
    const user_Info = req.body;
    const user_Email = user_Info.email;

    const GetAccount = new AccountService();

    const Get_Account = await GetAccount.GetAccountByPK(
        user_Email
    );

    if(!Get_Account){
        return res.status(403).send({
            status : 403,
            success : true,
            message : "Forbidden"
        });
    }
    
    return res.status(200).send({
        status : 200,
        success : true,
        message : "success"
    });
});

module.exports = router;