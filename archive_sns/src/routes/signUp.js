/**
 * 회원가입 관련 라우트
 */

var express = require('express');
var router = express.Router();
var account = require('../services/accountService'); //account 유효성 검사

/**
 * 회원가입
 */
router.POST('/', function(req, res) {
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
