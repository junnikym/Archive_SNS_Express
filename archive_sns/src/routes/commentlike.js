/**
 *  게시물 좋아요 관련 라우트
 */
var express = require('express');
var router = express.Router();
// var account = require('../services/accountService');

/**
 * 좋아요 수 보기
 */
router.get('/', function(req, res) {
    var likeInfo = req.body;

    var like_count = commentlike_count(likeInfo.feedNum);
    res.send(like_count);
});

/**
 * 좋아요 누른 사람  목록 보기
 */
router.get('/list/:commentNum', function(req, res) {
    var likeInfo = req.body;

    var like_list = commentlike_list(likeInfo.feedNum);
    res.send(like_list);
});

/**
 * 좋아요 입력
 */
router.post('/:commentNum', function(req, res) {
    var likeInfo = req.body;

    var like_up = commentlike_up(likeInfo.feedNum, likeInfo.userID);
    res.send(like_up);
});

/**
 * 좋아요 삭제
 */
router.delete('/:commentNum', function(req, res) { 
    var likeInfo = req.body;

    var like_down = commentlike_down(likeInfo.feedNum, likeInfo.userID);
    res.send(like_down);
});

module.exports = router;