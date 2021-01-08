var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var signform = `
    <form action="/signUp/signUp_process" method="post">
      <p>
        <input type="text" name="userID" placeholder="ID">
      </p>
      <p>
        <input type="password" name="userPW" placeholder="Password">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `
  res.send(signform);
});

module.exports = router;
