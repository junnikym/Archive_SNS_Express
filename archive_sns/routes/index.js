var express = require('express')
var router = express.Router()

router.get('/', (req, res) => { 
    var title = '<h1>Test Page</h1>';
    var description = ' -signup';
    var html = title + '<br>' + description + '<br>';
    html = html + '<a href="/signUp">signup</a>';
    html = html + '<br>' + '<a href="/signIn">signIn</a>';
    res.send(html);
});

module.exports = router;