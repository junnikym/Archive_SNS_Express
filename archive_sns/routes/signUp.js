var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var signform = `
    <form action="/signUp/signUp_process" method="post">
      <p><input type="text" name="userID" placeholder="ID"></p>
      <p><input type="password" name="userPW" placeholder="Password"></p>
      <p><input type="text" name="userName" placeholder="이름"></p>
      <p><input type="text" name="userEmail" placeholder="이메일"></p>
      <p><input type="submit"></p>
    </form>
    `
  res.send(signform);
});

router.post('/signUp_process', function(req, res) {
  userInfo = req.body;
  // Account(userInfo.userID, userInfo.userPW, userInfo.userName, userInfo.userEmail);
  // res.redirect('/');
  aaa = ' id : ' + userInfo.userID + ' pw : ' + userInfo.userPW + ' name : ' + userInfo.userName + ' email : ' + userInfo.userEmail;
  res.send(aaa);
});

module.exports = router;
