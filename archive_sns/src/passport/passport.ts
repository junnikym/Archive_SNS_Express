const express = require('express')
const router = express.Router()
const parseurl = require('parseurl')
const session = require('express-session')
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

//세션
router.use(session({
    secret: 'bshjsalgu',
    resave: false,
    saveUninitialized: true
}))
router.use(passport.initialize());
router.use(passport.session());

//google 로그인 정보 json
const googleCredentials = require('../../config/google.json')

passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris
}, 
function(accessToken, refreshToken, profile, done) {
    console.log('GoogleStrategy', accessToken, refreshToken, profile);

    // process.nextTick(function() {
    //     const user = profile;
    //     return done(null, user);
    // });
}
));

// //사용자가 인증 성공을 성공 할 경우
// passport.serializeUser(function(user, done) {
//     done(null, user); // user객체가 deserializeUser로 전달됨.
// });

// //이후 사용자의 요청시 호출
// passport.deserializeUser(function(obj, done) {
//     done(null, obj); // 여기의 user가 req.user가 됨
// });

router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile'] 
    }));

router.get('/google/callback',
	passport.authenticate('google', {
        failureRedirect: '/auth/fail', 
        successRedirect: '/auth/success'
    })
);

/**
 * test
 */
router.get('/', (req, res) => { 
    const content = '<a href = "/auth/google">google login</a>'
    res.send(content);
});

router.get('/success', (req, res) => { 
    const content = 'success'
    res.send(content);
});

router.get('/fail', (req, res) => { 
    const content = 'fail'
    res.send(content);
});

module.exports = router;