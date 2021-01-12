/**
 *  피드 관련 라우트
 */
var express = require('express');
var router = express.Router();
var account = require('../services/accountService');

/**
 * 피드 보기
 */
router.get('/', function(req, res) {
    Feed = feed_show();
    res.send(Feed);
});

/**
 * 피드 생성
 */
router.POST('/', function(req, res) {
    var feedInfo = req.body;

    var accountResult = account.feedAccount(feedInfo);
    if(accountResult){
      res.send('error!');
    }
    else{
      feed_create(feedInfo.userID, feedInfo.userName, feedInfo.title, feedInfo.content,
        feedInfo.time, feedInfo.file_name, feedInfo.file_type, feedInfo.file_copied);
      res.redirect('/');
    }
});

/**
 * 피드 수정
 */
router.PUT('/:feednum', function(req, res) { 
  var feedInfo = req.body;
  var accountresult = account.feedAccount(feedInfo);
  if(accountresult){
    res.send('error!');
  }
  else{
    feed_update(feedInfo.feedNum, feedInfo.title, feedInfo.content,
      feedInfo.time, feedInfo.file_name, feedInfo.file_type, feedInfo.file_copied);
    res.redirect('/');
  }
});

/*
 * 피드 삭제 
 */
router.DELETE('/:feednum', function(req, res) {
  feedInfo = req.body;
  feed_delete(feedInfo.feednum);
  res.redirect('/');
});

module.exports = router;