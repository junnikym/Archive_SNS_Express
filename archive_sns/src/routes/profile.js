/**
 * 프로필 관련 라우트
 */

var express = require('express');
var router = express.Router();

/**
 * 프로필 확인
 */
router.get('/', function(req, res) {
    var userInfo = req.body;
    var profile = user_Profile(userInfo.userID);
    res.send(profile);
});

/**
 * 프로필 업데이트
 */
router.put('/:usernum', function(req, res) {
    var userInfo = req.body;
    
    var new_userProfile = feed_update(userInfo.userID, userInfo.status, userInfo.userimage);

    res.redirect(new_userProfile);
});
module.exports = router;