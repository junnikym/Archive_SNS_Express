/**
 * 로그인 관련 라우트
 */

var express = require('express');
var router = express.Router();

import { userInfo } from "os";
/**
 * Authentification Service / DTO
 */

import { LoginAccountDTO } from "../Models/DTOs/AccountDTO";
import { AuthService } from "../services/AuthService";

router.get('/', function(req, res) {  //확인용 폼
  const login = `
    <form action="/auth/login/" method="post">
      <p><input type="text" name="email" placeholder="이메일"></p>
      <p><input type="password" name="pw" placeholder="Password"></p>
      <p><input type="submit"></p>
    </form>
    `
  res.send(login);
});

/**
 * 로그인
 */
router.post('/', async function(req, res) {
  const user_info = req.body;

  const account_service = new AuthService();

  const login_account_dto = new LoginAccountDTO();
  login_account_dto.email = user_info.email;
  login_account_dto.password = user_info.pw;

  const result = await account_service.validateAccount(login_account_dto);

  if(!result) {
    // @TODO : ERROR
    // error 401 -> not exist account
    console.log("not exist account or not match account : ", login_account_dto.email);
    res.redirect('/');
  }
  else {
    

    console.log("it can be login : ", result);
    // @TODO : send the account data to frontend
    res.redirect('/');
  }
});

module.exports = router;