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

import { AccountService } from '../services/AccountService';
import { Account } from '../Models/Entities/Account';

/**
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = function(result, res){
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
    return status(Get_Account, res);
});



/**
 * 프로필 생성
 */
router.put('/:usernum', function(req, res) {
    var user_Info = req.body;
    

});

/**
 * 프로필 수정
 */
router.put('/:usernum', function(req, res) {
    var user_Info = req.body;
    

});

module.exports = router;