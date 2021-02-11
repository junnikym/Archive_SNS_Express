/**
 *  게시물 좋아요 관련 라우트
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

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
     * CountLike
     * 
     * @param post_pk : target_pk
     */
    private async CountLike(req, res) {
        const s_req = sanitizeHtml(req);

        const like_Info = s_req.body;
        const target_pk = like_Info.post_pk;

        const Count_Like = await this.post_like_service.CountLike(
            target_pk
        );

        if(!Count_Like){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success",
            data : Count_Like
        });  
    }

    /**
     * WhoLike
     * 
     * @param post_pk : target_pk
     * @param limit : 
     */
    private async WhoLike(req, res) {
        const s_req = sanitizeHtml(req);

        const like_Info = s_req.body;
        const target_pk = like_Info.post_pk;
        const limit = like_Info.limit;

        const Who_Like = await this.post_like_service.WhoLike(
            target_pk,
            limit
        );
        
        if(!Who_Like){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success",
            data : Who_Like
        });  
    }

    /**
     * IsLike
     * 
     * @param user_pk : jwt tokken
     * @param post_pk : target_pk
     */
    private async IsLike(req, res) {
        const s_req = sanitizeHtml(req);

        const liketoggle_Info = s_req.body;
        const target_pk = liketoggle_Info.post_pk;
        const user_pk = res.locals.jwt_payload.user_pk;

        const Like_toggle = await this.post_like_service.IsLike(
            user_pk,
            target_pk
        );

        if(!Like_toggle){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Forbidden"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success",
            data : Like_toggle
        });  
    }

    /**
     * ToggleLike
     * 
     * @param user_pk : jwt tokken
     * @param Feed_pk : giver
     */
    private async ToggleLike(req, res) {
        const s_req = sanitizeHtml(req);

        const like_Info = s_req.body;
        const user_pk = res.locals.jwt_payload.pk;
        const giver = like_Info.Feed_pk;

        const PostLike = await this.post_like_service.ToggleLike(
            user_pk,
            giver
        );

        if(!PostLike){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };
        return res.status(200).send({
            status : 200,
            success : true,
            message : "success"
        });  
    }

}
