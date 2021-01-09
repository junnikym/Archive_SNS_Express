var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'nodeexam'
});

db.connect();

router.get('/', function(req, res) {    //확인용 폼
    var signform = `
      <form action="/createFeed/createFeed_Process" method="post">
        <p><input type="text" name="userid" placeholder="ID"></p>
        <p><input type="text" name="username" placeholder="name"></p>
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

router.post('/createFeed_Process', function(req, res) {
    var feedInfo = req.body;
    db.query(`insert into feed (userid, username, title, content, time, likecount, file_name, file_type, file_copied)
    values('${feedInfo.userid}', '${feedInfo.username}', '${feedInfo.title}', '${feedInfo.content}', '${feedInfo.time}', 0, '${feedInfo.file_name}', '${feedInfo.file_type}', '${feedInfo.file_copied}')`, function(error, feed, fields) {
        res.redirect('/');
    });
});

module.exports = router;