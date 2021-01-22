/**
 * 댓글 관련 라우트 생성,삭제,수정
 */

var express = require('express');
var router = express.Router();

/**
 * 댓글 표시
 * @param feedNum 게시물 번호
 * @param commentNum 부모댓글 번호
 */
router.get('/', function(req, res) {
    var commentInfo = req.body;
    var comment = comment_show(commentInfo.feedNum, commentInfo.commentNum);
    res.send(comment);
});

/**
 * 댓글 작성
 */
router.post('/', function(req, res) {
    var commentInfo = req.body;
    
    comment_Create(commentInfo.feedNum, commentInfo.commentNum, commentInfo.userID, commentInfo.content, commentInfo.time);
    res.redirect('/');
});

/**
 * 댓글 수정
 */
router.put('/:commentpk', function(req, res) {
    var commentInfo = req.body;
    
    comment_Update(commentInfo.pk, commentInfo.userID, commentInfo.content, commentInfo.time);
    res.redirect('/');
});

/**
 * 댓글 삭제
 */
router.delete('/:commentpk', function(req, res) {
    var commentInfo = req.body;
    
    comment_Delete(commentInfo.pk);
    res.redirect('/');
});

module.exports = router;