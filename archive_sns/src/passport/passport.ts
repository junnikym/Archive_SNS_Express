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


passport.use(new GoogleStrategy({
    clientID: '246734913456-einsa1t8j3nckmntjidq86cg1vj596dq.apps.googleusercontent.com',
    clientSecret: 'wehE8TZxNfBvWghLXgYqpne0',
    callbackURL: 'http://localhost:8000/passport/google/callback'
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
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;