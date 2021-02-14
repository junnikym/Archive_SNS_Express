/**
 * 댓글 관련 라우트 생성,삭제,수정
 */
const express = require('express');
import sanitizeHtml from 'sanitize-html';

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

        this.router = express.Router();

        // < routing >
        this.router.get(
            "/test", 
            async (req, res) => this.TestComment(req, res)
        );

        this.router.get(
            "/", 
            async (req, res) => this.GetPostComment(req, res)
        );

        this.router.post(
            '/create',
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
     * TEST
     * @param req 
     * @param res 
     */
    private TestComment(req, res) {
        const form = `
        <form action='/comment/create' method='post'>
            <p>
                <textarea name="user_pk"></textarea>
            </p>
            </p>
                <textarea name="content"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `;

        return res.send(form);
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
        const s_post_pk = sanitizeHtml(req.body.post_pk);
        const s_offset = sanitizeHtml(req.body.offset);
        const s_limit = sanitizeHtml(req.body.limit);
        const s_order_by = sanitizeHtml(req.body.order_by);

        const GetPostComment = await this.post_comment_service.GetPostComment(
            s_post_pk,
            s_offset,
            s_limit,
            s_order_by
        );

        if(!GetPostComment){
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
            data : GetPostComment
        });
    }

    /**
     * CreateComment
     * 
     */
    private async CreateComment(req, res) {
        // const s_post_pk = sanitizeHtml(req.body.post_pk);
        // const s_user_pk = sanitizeHtml(req.body.user_pk);

        // const data = s_post_pk + s_user_pk;

        // console.log(data);
        // console.log('123');

        // return res.send(data)
        const user_pk = res.locals.jwt_payload.pk;
        const s_post_pk = sanitizeHtml(req.body.post_pk);


        const comment_Info = req.body;

        const Create_Comment = new CommentDTO();
        Create_Comment.content = comment_Info.content; 

        if(!Create_Comment.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "need Comment Content"
            });
        }

        const CreateComment = await this.post_comment_service.CreateComment(
            user_pk,
            s_post_pk,
            Create_Comment
        )

        if(!CreateComment){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "Bad Request"
            });
        };

        return res.status(200).send({
            status : 200,
            success : true,
            message : "Created",
            data : CreateComment
        });
    }

    /**
     * UpdateComment
     * 
     * @param pk : jwt tokken
     * @param comment_pk :
     * @param Update_Comment : CommentDTO(content)
     */
    private async UpdateComment(req, res) {
        const s_comment_pk = sanitizeHtml(req.body.comment_pk);
        const pk = res.locals.jwt_payload.pk;

        const comment_Info = req.body;

        const Update_Comment = new CommentDTO();
        Update_Comment.content = comment_Info.content;

        if(!Update_Comment.content){
            return res.status(400).send({
                status : 400,
                success : false,
                message : "need Comment Content"
            });
        }

        const UpdateComment = await this.post_comment_service.UpdateComment(
            pk,
            s_comment_pk,
            Update_Comment
        )
        
        if(!UpdateComment){
            return res.status(403).send({
                status : 403,
                success : false,
                message : "Forbidden"
            });
        };

        return res.status(200).send({
            status : 200,
            success : true,
            message : "Created",
            data : UpdateComment
        });
    }

    /**
     * DeleteComment
     * 
     * @param pk : jwt tokken
     * @param comment_pk : 
     */
    private async DeleteComment(req, res) {
        const s_comment_pk = sanitizeHtml(req.body.comment_pk);
        const pk = res.locals.jwt_payload.pk;

        const DeleteComment = await this.post_comment_service.DeleteComment(
            pk,
            s_comment_pk
        )
        
        if(!DeleteComment){
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