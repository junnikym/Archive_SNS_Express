/**
 * 댓글 관련 라우트 생성,삭제,수정
 */

var express = require('express');
var router = express.Router();

import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostCommentService } from '../services/CommentService';

import { CommentDTO } from '../Models/DTOs/CommentDTO';

/**
 * 결과처리
 * 
 * @param result : 라우트 처리 결과
 * @param res : 상태 처리 결과
 */
const status = function(result, res){
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
router.get(
    '/', 
    async function(req, res) {
    const post_pk = req.body.post_pk;
    const offset = req.body.offset;
    const limit = req.body.limit;
    const order_by = req.body.order_by;

    const PostComment_Service = new PostCommentService();

    const GetPostComment = await PostComment_Service.GetPostComment(
        post_pk,
        offset,
        limit,
        order_by
    );
    return status(GetPostComment, res);
});

/**
 * CreateComment
 * 
 * @param user_pk : jwt tokken
 * @param post_pk : 
 * @param Create_Comment : CommentDTO(content)
 */
router.post(
    '/', 
    VerifyAccessToken,
    async function(req, res) {

    const comment_Info = req.body;
    const post_pk = comment_Info.post_pk;

    const user_pk = res.locals.jwt_payload.pk;

    const Create_Comment = new CommentDTO();
    Create_Comment.content = comment_Info.content;

    const CreatePost_Comment = new PostCommentService();

    const CreateComment = await CreatePost_Comment.CreateComment(
        user_pk,
        post_pk,
        Create_Comment
    )
    return status(CreateComment, res);
});

/**
 * UpdateComment
 * 
 * @param pk : jwt tokken
 * @param comment_pk :
 * @param Update_Comment : CommentDTO(content)
 */
router.put(
    '/:commentpk',
    VerifyAccessToken,
    async function(req, res) {
    const comment_Info = req.body;
    const comment_pk = comment_Info.comment_pk
    const pk = res.locals.jwt_payload.pk;

    const Update_Comment = new CommentDTO();
    Update_Comment.content = comment_Info.content;

    const UpdatePost_Comment = new PostCommentService();

    const UpdateComment = await UpdatePost_Comment.UpdateComment(
        pk,
        comment_pk,
        Update_Comment
    )
    return status(UpdateComment, res);
});

/**
 * DeleteComment
 * 
 * @param pk : jwt tokken
 * @param comment_pk : 
 */
router.delete(
    '/:commentpk',
    VerifyAccessToken,
    async function(req, res) {
    const comment_Info = req.body;
    const comment_pk = comment_Info.comment_pk
    const pk = res.locals.jwt_payload.pk;

    const DeletePost_Comment = new PostCommentService();

    const DeleteComment = await DeletePost_Comment.DeleteComment(
        pk,
        comment_pk
    )
    return status(DeleteComment, res);
});

module.exports = router;