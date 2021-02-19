const express = require('express')
const router = express.Router()
const parseurl = require('parseurl')
const session = require('express-session')
const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy
//세션
router.use(session({
    secret: 'bshjsalgu',
    resave: false,
    saveUninitialized: true
}))

//사용자가 인증 성공을 성공 할 경우
passport.serializeUser(function(user, done) {
    done(null, user);
});

//이후 사용자의 요청시 호출
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const googleCredentials = require('../../config/google.json')
console.log(googleCredentials);
passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        const user = profile;
        return done(null, user);
    });
}
));

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;