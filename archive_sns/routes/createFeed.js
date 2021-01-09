var express = require('express');
var router = express.Router();
const fs = require('fs'); //파일 읽게 해주는 모듈

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data); //해당환경설정 데이터를 파싱해서 가져옴
const mysql = require('mysql');

const db = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.passord,
    port: conf.port,
    database: conf.database
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