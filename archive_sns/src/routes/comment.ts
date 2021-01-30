/**
 * 댓글 관련 라우트 생성,삭제,수정
 */

var express = require('express');
var router = express.Router();

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { CommentDTO } from '../Models/DTOs/CommentDTO';

import { PostCommentService } from '../services/CommentService';

export class CommentControl {

    public router;

    private post_comment_service : PostCommentService;

    constructor(
        post_comment_service : PostCommentService
    ) {

        this.post_comment_service = post_comment_service;

        this.router = router;

        // < routing >
        this.router.get(
            "/", 
            async (req, res) => this.GetPostComment(res, req)
        );

        this.router.post(
            '/',
            VerifyAccessToken,
            async (req, res) => this.CreateComment(req, res)
        );

        this.router.put(
            '/:commentpk', 
            VerifyAccessToken, 
            async (req, res) => this.UpdateComment(req, res)
        );

        this.router.delete(
            '/:commentpk', 
            VerifyAccessToken, 
            async (req, res) => this.DeleteComment(req, res)
        );

    }


    /**
     * 결과처리
     * 
     * @param result : 라우트 처리 결과
     * @param res : 상태 처리 결과
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
     * GetPostComment
     * 
     * @param post_pk : 
     * @param offset : 
     * @param limit : 
     * @param order_by : 
     */
    private async GetPostComment(req, res) {
        const post_pk = req.body.post_pk;
        const offset = req.body.offset;
        const limit = req.body.limit;
        const order_by = req.body.order_by;

        const GetPostComment = await this.post_comment_service.GetPostComment(
            post_pk,
            offset,
            limit,
            order_by
        );
        return this.status(GetPostComment, res);
    }

    /**
     * CreateComment
     * 
     * @param user_pk : jwt tokken
     * @param post_pk : 
     * @param Create_Comment : CommentDTO(content)
     */
    private async CreateComment(req, res) {
        const comment_Info = req.body;

        const post_pk = comment_Info.post_pk;
        const user_pk = res.locals.jwt_payload.pk;

        const Create_Comment = new CommentDTO();
        Create_Comment.content = comment_Info.content;

        const CreateComment = await this.post_comment_service.CreateComment(
            user_pk,
            post_pk,
            Create_Comment
        )
        return this.status(CreateComment, res);
    }


    /**
     * UpdateComment
     * 
     * @param pk : jwt tokken
     * @param comment_pk :
     * @param Update_Comment : CommentDTO(content)
     */
    async UpdateComment(req, res) {
        const comment_Info = req.body;

        const comment_pk = comment_Info.comment_pk
        const pk = res.locals.jwt_payload.pk;

        const Update_Comment = new CommentDTO();
        Update_Comment.content = comment_Info.content;

        const UpdateComment = await this.post_comment_service.UpdateComment(
            pk,
            comment_pk,
            Update_Comment
        )
        return this.status(UpdateComment, res);
    }

    /**
     * DeleteComment
     * 
     * @param pk : jwt tokken
     * @param comment_pk : 
     */
    private async DeleteComment(req, res) {
        const comment_Info = req.body;

        const comment_pk = comment_Info.comment_pk
        const pk = res.locals.jwt_payload.pk;

        const DeleteComment = await this.post_comment_service.DeleteComment(
            pk,
            comment_pk
        )
        return this.status(DeleteComment, res);
    }

}