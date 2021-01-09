var express = require('express');
var router = express.Router();

router.get('/show', function(req, res) {
    Feed = feed_show();
    res.send(Feed);
});

router.get('/create', function(req, res) {    //확인용 폼
    var signform = `
      <form action="/feed/create/createFeed_Process" method="post">
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

router.post('/create/createFeed_Process', function(req, res) {
    feedInfo = req.body;
    // feed_create(feedInfo.userID, feedInfo.userName, feedInfo.title, feedInfo.content, feedInfo.time, feedInfo.file_name, feedInfo.file_type, feedInfo.file_copied);
    // res.redirect('/');
    res.send(feedInfo);
});

router.get('/update', function(req, res) {    //확인용 폼
    var signform = `
      <form action="/feed/create/createFeed_Process" method="post">
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

router.post('/update/update_Process', function(req, res) {
    feedInfo = req.body;
    // feed_update(feedInfo.userID, feedInfo.userName, feedInfo.title, feedInfo.content, feedInfo.time, feedInfo.file_name, feedInfo.file_type, feedInfo.file_copied);
    // res.redirect('/');
    res.send(feedInfo);
});

router.post('/delete', function(req, res) {
    feedInfo = req.body;
    // feed_delete(feedInfo.number);
    // res.redirect('/');
    res.send(feedInfo);
});

module.exports = router;