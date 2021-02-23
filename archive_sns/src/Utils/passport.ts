import express from 'express';
import parseurl from 'parseurl';
import session from 'express-session';
import passport from 'passport';

const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

export function googlelogin() {
    //세션
    session({
        secret: 'bshjsalgu',
        resave: false,
        saveUninitialized: true
    })
    passport.initialize();
    passport.session();

    //사용자가 인증 성공을 성공 할 경우
    passport.serializeUser(function(user, done) {
        console.log("google login success");
        done(null, user); // user객체가 deserializeUser로 전달됨.
    });

    //이후 사용자의 요청시 호출
    passport.deserializeUser(function(obj, done) {
        done(null, obj); // 여기의 user가 req.user가 됨
    });

    //google 로그인 정보 json
    const googleCredentials = require('../../config/google.json')

    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris
        }, 
        function(accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile);
            const user = profile;

            return done(null, user);
        }
    ));
}

///////////////////////////////////////////////////////////////
    router.get('/google',
        passport.authenticate('google', { 
            scope: ['profile'] 
        }));

    router.get('/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/auth/login', 
            successRedirect: '/auth/'
        })
    );

    /**
     * test
     */

    // 로그인 안되어있으면 튕구기
    const authenticateUser = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(301).redirect('/auth/login');
        }
    };

    router.get('/', authenticateUser,(req, res) => { 
        const googleid = req.user.id;
        const googlename = req.user.displayName;
        const content = 'login success<br>' + googleid + '<br>' + googlename;

        console.log(req.user);

        res.send(content);
    });

    router.get('/login', (req, res) => { 
        const content = '<a href = "/auth/google">google login</a>'
        res.send(content);
    });
}
