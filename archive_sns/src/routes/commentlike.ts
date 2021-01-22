/**
 *  게시물 좋아요 관련 라우트
 */
import express, { Request, Response } from "express";
var router = express.Router();

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { CommentLikeService } from "../services/LikeService";


// /**
//  * 좋아요 수 보기
//  */
// router.get('/', function(req, res) {
//     var likeInfo = req.body;

    
// });

// /**
//  * 좋아요 누른 사람  목록 보기
//  */
// router.get('/list/:commentNum', function(req, res) {
//     var likeInfo = req.body;


// });

/**
 * 좋아요 입력
 */
router.post(
    '/:commentNum', 
    VerifyAccessToken,
    async function(req, res) {
    const like_Info = req.body;

    const comment_pk = like_Info.comment_pk;
    const user_pk = res.locals.jwt_payload.pk;

    const Comment_Like = new CommentLikeService();
    const CommentLike = await Comment_Like.ToggleLike(
        user_pk,
        comment_pk
    );

    if(!CommentLike){
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