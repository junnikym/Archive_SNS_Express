/**
 *  게시물 좋아요 관련 라우트
 */
const express = require('express');

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostLikeService } from '../services/LikeService';

export class FeedLikeControl {

    public router;

    private post_like_service: PostLikeService;

    constructor(
        post_like_service: PostLikeService
    ) {
        this.post_like_service = post_like_service;

        this.router = express.Router();

        this.router.get(
            '/count',
            async (req, res) => this.CountLike(req, res)
        );

        this.router.get(
            '/userlist/:feedNum', 
            async (req, res) => this.WhoLike(req, res)
        );

        this.router.get(
            '/list/:feedNum', 
            VerifyAccessToken,
            async (req, res) => this.IsLike(req, res)
        );

        this.router.post(
            '/:feedNum', 
            async (req, res) => this.ToggleLike(req, res)
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
     * CountLike
     * 
     * @param post_pk : target_pk
     */
    private async CountLike(req, res) {
        const like_Info = req.body;
        const target_pk = like_Info.post_pk;

        const Count_Like = await this.post_like_service.CountLike(
            target_pk
        );

        return this.status(Count_Like, res);
    }

    /**
     * WhoLike
     * 
     * @param post_pk : target_pk
     * @param limit : 
     */
    private async WhoLike(req, res) {
        const like_Info = req.body;
        const target_pk = like_Info.post_pk;
        const limit = like_Info.limit;

        const Who_Like = await this.post_like_service.WhoLike(
            target_pk,
            limit
        );
        
        return this.status(Who_Like, res);
    }

    /**
     * IsLike
     * 
     * @param user_pk : jwt tokken
     * @param post_pk : target_pk
     */
    private async IsLike(req, res) {
        const liketoggle_Info = req.body;
        const target_pk = liketoggle_Info.post_pk;
        const user_pk = res.locals.jwt_payload.user_pk;

        const Like_toggle = await this.post_like_service.IsLike(
            user_pk,
            target_pk
        );

        return this.status(Like_toggle, res);
    }

    /**
     * ToggleLike
     * 
     * @param user_pk : jwt tokken
     * @param Feed_pk : giver
     */
    private async ToggleLike(req, res) {
        const like_Info = req.body;
        const user_pk = res.locals.jwt_payload.pk;
        const giver = like_Info.Feed_pk;

        const PostLike = await this.post_like_service.ToggleLike(
            user_pk,
            giver
        );

        return this.status(PostLike, res);
    }

}