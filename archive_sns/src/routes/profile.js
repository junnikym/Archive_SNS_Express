/**
 * 프로필 관련 라우트
 */

var express = require('express');
var router = express.Router();

/**
 * 프로필 확인
 */
router.GET('/', function(req, res) {
    userInfo = req.body;
    profile = user_Profile(userInfo.userID);
    res.send(profile);
});

/**
 * 프로필 업데이트
 */
router.PUT('/:usernum', function(req, res) {
    userInfo = req.body;
    
    new_userProfile = feed_update(userInfo.userID, userInfo.status, userInfo.userimage);

    res.redirect('/profile');
});
module.exports = router;