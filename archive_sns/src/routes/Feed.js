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
 * 피드 생성 폼(TEST)
 */
router.get('/create', function(req, res) {
    var signform = `
    <form action="/feed/create/Process" method="post">
      <p><input type="text" name="userID" placeholder="ID"></p>
      <p><input type="text" name="userName" placeholder="name"></p>
      <p><input type="text" name="title" placeholder="title"></p>
      <p><input type="text" name="content" placeholder="content"></p>
      <p><input type="text" name="time" placeholder="time"></p>
      <p><input type="text" name="file_name" placeholder="file"></p>
      <p><input type="text" name="file_type" placeholder="file"></p>
      <p><input type="text" name="file_copied" placeholder="file"></p>
      <p><input type="submit"></p>
    </form>
    `;
    res.send(signform);
});

/**
 * 피드 생성
 */
router.post('/create/Process', function(req, res) {
    var feedInfo = req.body;
    console.log(feedInfo);
    res.send(feedInfo);
    // var accountResult = account.feedAccount(feedInfo);
    // if(accountResult){
    //   res.send('error!');
    // }
    // else{
    //   feed_create(feedInfo.userID, feedInfo.userName, feedInfo.title, feedInfo.content,
    //     feedInfo.time, feedInfo.file_name, feedInfo.file_type, feedInfo.file_copied);
    //   res.redirect('/');
    // }
});

/**
 * 피드 업데이트 폼(TEST)
 */
router.get('/update', function(req, res) { 
    var signform = `
      <form action="/feed/update/Process" method="post">
        <p><input type="text" name="userID" placeholder="ID"></p>
        <p><input type="text" name="userName" placeholder="name"></p>
        <p><input type="text" name="title" placeholder="title"></p>
        <p><input type="text" name="content" placeholder="content"></p>
        <p><input type="text" name="time" placeholder="time"></p>
        <p><input type="text" name="file_name" placeholder="file"></p>
        <p><input type="text" name="file_type" placeholder="file"></p>
        <p><input type="text" name="file_copied" placeholder="file"></p>
        <p><input type="submit"></p>
      </form>
      `
    res.send(signform);
});

/**
 * 피드 업데이트
 */
router.post('/update/Process', function(req, res) { 
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
router.get('/delete', function(req, res) {
    feedInfo = req.body;
    feed_delete(feedInfo.feednum);
    res.redirect('/');
});

module.exports = router;