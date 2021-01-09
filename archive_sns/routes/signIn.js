var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {    //확인용 폼
    var signform = `
      <form action="/signIn/signIn_Process" method="post">
        <p><input type="text" name="userID" placeholder="ID"></p>
        <p><input type="password" name="userPW" placeholder="Password"></p>
        <p><input type="submit"></p>
      </form>
      `
    res.send(signform);
  });

router.post('/signIn_Process', function(req, res) {
    signInInfo = req.body;
    // Account(userInfo.userID, userInfo.userPW);
    // res.redirect('/');
    res.send(signInInfo);
  });

module.exports = router;