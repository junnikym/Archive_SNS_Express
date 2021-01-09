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

router.get('/', function(req, res) {
    db.query(`SELECT * FROM feed`, function(error, feed, fields) {
        res.send(feed);
    });
});
module.exports = router;