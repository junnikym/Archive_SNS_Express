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

router.get('/', function(req, res) {
    db.query(`SELECT * FROM feed`, function(error, feed, fields) {
        res.send(feed);
    });
});
module.exports = router;