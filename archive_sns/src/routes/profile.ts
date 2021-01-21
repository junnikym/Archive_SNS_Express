/**
 * 프로필 관련 라우트
 */
import * as express from "express";
var router = express.Router();

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

/**
 * 프로필 삭제
 */
router.put(
    '/:usernum', 
    async function(req, res) {
    const pk = res.locals.jwt_payload.pk;
    const user_Info = req.body;
    const password = user_Info.password;

    const DeleteProfile = new AccountService();
    const Delete_Profile = await DeleteProfile.DeleteAccount(
        pk,
        password
    );
    if(!Delete_Profile){
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