/**
 *  게시물 좋아요 관련 라우트
 */
import * as express from "express";
const router = express.Router();

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostLikeService } from '../services/LikeService';

/**
 * 결과처리
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = (result, res) => {
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
 * CountLike
 * 
 * @param post_pk : target_pk
 */
router.get(
    '/count',
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.post_pk;

    const Post_Like = new PostLikeService();
    const Count_Like = Post_Like.CountLike(
        target_pk
    );

    return status(Count_Like, res);
});

/**
 * WhoLike
 * 
 * @param post_pk : target_pk
 * @param limit : 
 */
router.get(
    '/userlist/:feedNum', 
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.post_pk;
    const limit = like_Info.limit;

    const Post_Like = new PostLikeService();
    const Who_Like = Post_Like.WhoLike(
        target_pk,
        limit
    );
    
    return status(Who_Like, res);
});

/**
 * IsLike
 * 
 * @param user_pk : jwt tokken
 * @param post_pk : target_pk
 */
router.get(
    '/list/:feedNum', 
    VerifyAccessToken,
    async (req, res) => {
    const liketoggle_Info = req.body;
    const target_pk = liketoggle_Info.post_pk;
    const user_pk = res.locals.jwt_payload.user_pk;

    const Post_Like = new PostLikeService();

    const Like_toggle = Post_Like.IsLike(
        user_pk,
        target_pk
    );
    return status(Like_toggle, res);
});

/**
 * ToggleLike
 * 
 * @param user_pk : jwt tokken
 * @param Feed_pk : giver
 */
router.post(
    '/:feedNum', 
    async (req, res) => {
    const like_Info = req.body;
    const user_pk = res.locals.jwt_payload.pk;
    const giver = like_Info.Feed_pk;

    const Post_Like = new PostLikeService();

    const PostLike = await Post_Like.ToggleLike(
        user_pk,
        giver
    );
    return status(PostLike, res);
});

module.exports = router;