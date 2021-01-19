/**
 * 댓글 관련 라우트 생성,삭제,수정
 */

var express = require('express');
var router = express.Router();

import { 
    RefreshTokenGenerator,
    AccessTokenGenerator,
    VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { PostCommentService } from '../services/CommentService';

import { 
    CreateCommentDTO,
    UpdateCommentDTO
} from '../Models/DTOs/CommentDTO';

/**
 * 댓글 표시
 * @param feedNum 게시물 번호
 * @param commentNum 부모댓글 번호
 */
router.get('/', function(req, res) {
    // var commentInfo = req.body;
    // var comment = comment_show(commentInfo.feedNum, commentInfo.commentNum);
    // res.send(comment);
});

/**
 * 댓글 작성
 */
router.post(
    '/', 
    async function(req, res) {

    var comment_Info = req.body;
    const pk = res.locals.jwt_payload.pk;

    const Create_Comment = new CreateCommentDTO();
    Create_Comment.content = comment_Info.content;

    const CreatePost_Comment = new PostCommentService();

    const CreateComment = await CreatePost_Comment.CreatePostComment(
        pk,
        comment_Info.post_pk,
        Create_Comment
    )

    if(!CreateComment){
        return res.state(403).send({
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
 * 댓글 수정
 */
router.put(
    '/:commentpk',
    async function(req, res) {
    const comment_Info = req.body;
    const pk = res.locals.jwt_payload.pk;

    const Update_Comment = new UpdateCommentDTO();
    Update_Comment.content = comment_Info.content;

    const UpdatePost_Comment = new PostCommentService();

    const UpdateComment = await UpdatePost_Comment.UpdatePostComment(
        pk,
        comment_Info.comment_pk,
        Update_Comment
    )

    if(!UpdateComment){
        return res.state(403).send({
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
 * 댓글 삭제
 */
router.delete(
    '/:commentpk',
    async function(req, res) {
    const comment_Info = req.body;
    const pk = res.locals.jwt_payload.pk;

    const DeletePost_Comment = new PostCommentService();

    const DeleteComment = await DeletePost_Comment.DeletePostComment(
        pk,
        comment_Info.comment_pk
    )

    if(!DeleteComment){
        return res.state(403).send({
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