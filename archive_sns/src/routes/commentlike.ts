/**
 *  게시물 좋아요 관련 라우트
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { CommentLikeService } from "../services/LikeService";

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
     * 좋아요 수 보기
     * 
     * @param comment_pk : target_pk
     */
    private async CountLike(req, res) {
        const s_target_pk = sanitizeHtml(req.body.comment_pk);

        const Count_Like = await this.comment_like_service.CountLike(
            s_target_pk
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
     * @param comment_pk : target_pk
     * @param limit : 
     */
    private async WhoLike(req, res) {
        const s_target_pk = sanitizeHtml(req.body.comment_pk);
        const s_limit = sanitizeHtml(req.body.limit);

        const Who_Like = await this.comment_like_service.WhoLike(
            s_target_pk,
            s_limit
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
     * ToggleLike 
     * 
     * @param user_pk : jwt tokken
     * @param comment_pk : 
     */
    private async ToggleLike(req, res) {
        const s_comment_pk = sanitizeHtml(req.body.comment_pk);
        const user_pk = res.locals.jwt_payload.pk;

        const CommentLike = await this.comment_like_service.ToggleLike(
            user_pk,
            s_comment_pk
        );

        if(!CommentLike){
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
