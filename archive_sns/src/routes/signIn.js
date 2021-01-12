/**
 * 로그인 관련 라우트
 */

var express = require('express');
var router = express.Router();

/**
 * 로그인
 */
router.get('/', function(req, res) {
    signInInfo = req.body;

    Account(userInfo.userID, userInfo.userPW);
    res.redirect('/');
  });

module.exports = router;