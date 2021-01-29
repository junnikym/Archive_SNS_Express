/**
 *  게시물 좋아요 관련 라우트
 */
const express = require('express');

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { CommentLikeService } from "../services/LikeService";

<<<<<<< HEAD
/**
 * 결과 처리
 * 
 * @param result 라우트 처리 결과
 * @param res 상태 처리 결과
 */
const status = (result, res) => {
    if(!result){
        return res.status(403).send({
            status : 403,
=======
export class CommentLikeControl {

    public router;

    private comment_like_service: CommentLikeService;

    constructor(
        commend_like_service: CommentLikeService
    ) {
        this.comment_like_service = commend_like_service;

        this.router = express.Router();

        this.router.get(
            '/count',
            async (req, res) => this.CountLike(req, res)
        );

        this.router.get(
            '/userlist/:feedNum', 
            async (req, res) => this.WhoLike(req, res)
        );

        this.router.post(
            '/:commentNum', 
            VerifyAccessToken, 
            async (req, res) => this.ToggleLike(req, res)
        );
    }

    /**
     * 결과 처리
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
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264
            success : true,
            message : "success"
        });  
    }

<<<<<<< HEAD
/**
 * 좋아요 수 보기
 * 
 * @param comment_pk : target_pk
 */
router.get(
    '/count',
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.comment_pk;
=======
    /**
     * 좋아요 수 보기
     * 
     * @param comment_pk : target_pk
     */
    private async CountLike(req, res) {
        const like_Info = req.body;
        const target_pk = like_Info.comment_pk;
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264

        const Count_Like = await this.comment_like_service.CountLike(
            target_pk
        );

        return this.status(Count_Like, res);
    }

<<<<<<< HEAD
/**
 * WhoLike
 * 
 * @param comment_pk : target_pk
 * @param limit : 
 */
router.get(
    '/userlist/:feedNum', 
    (req, res) => {
    const like_Info = req.body;
    const target_pk = like_Info.comment_pk;
    const limit = like_Info.limit;

    const comment_Like = new CommentLikeService();
    const Who_Like = comment_Like.WhoLike(
        target_pk,
        limit
    );
    
    return status(Who_Like, res);
});

/**
 * ToggleLike 
 * 
 * @param user_pk : jwt tokken
 * @param comment_pk : 
 */
router.post(
    '/:commentNum', 
    VerifyAccessToken,
    async (req, res) => {
    const like_Info = req.body;

    const comment_pk = like_Info.comment_pk;
    const user_pk = res.locals.jwt_payload.pk;

    const Comment_Like = new CommentLikeService();
    const CommentLike = await Comment_Like.ToggleLike(
        user_pk,
        comment_pk
    );
    return status(CommentLike, res);
});

module.exports = router;
=======
    /**
     * WhoLike
     * 
     * @param comment_pk : target_pk
     * @param limit : 
     */
    private async WhoLike(req, res) {
        const like_Info = req.body;
        const target_pk = like_Info.comment_pk;
        const limit = like_Info.limit;

        const Who_Like = await this.comment_like_service.WhoLike(
            target_pk,
            limit
        );
        
        return this.status(Who_Like, res);
    }

    /**
     * ToggleLike 
     * 
     * @param user_pk : jwt tokken
     * @param comment_pk : 
     */
    private async ToggleLike(req, res) {
        const like_Info = req.body;

        const comment_pk = like_Info.comment_pk;
        const user_pk = res.locals.jwt_payload.pk;

        const CommentLike = await this.comment_like_service.ToggleLike(
            user_pk,
            comment_pk
        );

        return this.status(CommentLike, res);
    }

}
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264
