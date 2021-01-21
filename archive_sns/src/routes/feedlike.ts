/**
 *  게시물 좋아요 관련 라우트
 */
import * as express from "express";
var router = express.Router();

import { PostLikeService } from '../services/LikeService';
// var account = require('../services/accountService');

/**
 * 좋아요 수 보기
 */
router.get(
    '/',
    function(req, res) {
    var likeInfo = req.body;
    const pk = res.locals.jwt_payload.pk;


});

/**
 * 좋아요 입력, 삭제
 */
router.post(
    '/:feedNum', 
    async function(req, res) {
    var like_Info = req.body;
    const pk = res.locals.jwt_payload.pk;
    const giver = like_Info.Feed_pk;

    const PostLike = new PostLikeService();

    const Post_Like = await PostLike.ToggleLike(
        pk,
        giver
    );
    
    if(!Post_Like){
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
 * 좋아요 누른 사람  목록 보기
 */
router.get('/list/:feedNum', function(req, res) {
    var like_Info = req.body;

    
});

module.exports = router;