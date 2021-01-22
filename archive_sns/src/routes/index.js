var express = require('express')
var router = express.Router()

router.get('/', (req, res) => { 
    var title = '<h1>Test Page</h1>';
    var description = ' -menu';
    var html = title + '<br>' + description + '<br>';
    html = html + '<a href="/signUp">signup</a>';
    html = html + '<br>' + '<a href="/auth">login</a>';
    html = html + '<br>' + '<a href="/feed/create">피드 쓰기</a>';
    html = html + '<br>' + '<a href="/feed">피드 보기</a>';
    html = html + '<br>' + '<a href="/feed/update">피드 수정</a>';
    html = html + '<br>' + '<a href="/feed/delete">피드 삭제</a>';
    res.send(html);
});

module.exports = router;