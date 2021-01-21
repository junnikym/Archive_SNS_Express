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
router.put('/:usernum', function(req, res) {
    var user_Info = req.body;
    

});
module.exports = router;