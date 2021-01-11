var express = require('express');
var router = express.Router();
var account = require('../services/accountService');

router.get('/', function(req, res) {  //확인용 폼
  var signform = `
    <form action="/signUp/signUp_process" method="post">
      <p><input type="text" name="userID" placeholder="ID"></p>
      <p><input type="password" name="userPW" placeholder="Password"></p>
      <p><input type="password" name="userPW2" placeholder="Password"></p>
      <p><input type="text" name="userName" placeholder="이름"></p>
      <p><input type="text" name="userEmail" placeholder="이메일"></p>
      <p><input type="submit"></p>
    </form>
    `
  res.send(signform);
});

router.post('/signUp_process', function(req, res) {
  userInfo = req.body;
  var accountResult = account.usersignUp(userInfo);
  
  if(accountResult){
    res.send("error !");
  }
  else{
    res.redirect('/');
  }
});

module.exports = router;
