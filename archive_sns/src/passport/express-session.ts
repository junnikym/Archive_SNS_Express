const express = require('express')
var router = express.Router()

const parseurl = require('parseurl')
const session = require('express-session')

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    const pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

router.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

router.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

module.exports = router;