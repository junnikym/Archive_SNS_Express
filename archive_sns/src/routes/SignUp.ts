var express = require('express');
var router = express.Router();

// import { profile } from 'console';
import { CreateAccountDTO } from '../Models/DTOs/AccountDTO';
import { CreateImageDTO } from '../Models/DTOs/ImageDTO';

import { AccountService } from '../services/AccountService';

router.get('/', function(req, res) {  //확인용 폼
  var signform = `
    <form action="/signup/" method="post">
      <p><input type="text" name="email" placeholder="이메일"></p>
      <p><input type="password" name="pw" placeholder="Password"></p>
      <p><input type="password" name="pw_confirm" placeholder="Password Confirm"></p>
      <p><input type="text" name="name" placeholder="이름"></p>
      <p><input type="submit"></p>
    </form>
    `
  res.send(signform);
});

router.post('/', async function(req, res) {
  const user_info = req.body;

  if(user_info.pw != user_info.pw_confirm) {
    // Error
    res.redirect('/');
  }
  
  const account_dto = new CreateAccountDTO();
  const image_dto = new CreateImageDTO();

  const account_service = new AccountService();

  // Create Account DTO Setting
  account_dto.email    = user_info.email;
  account_dto.password = user_info.pw;
  account_dto.name     = user_info.name;

  // Profile Image Setting
  const profile_img = null;
  //    @TODO : FILL CODE 

  await account_service.CreateAccount(account_dto, profile_img);

  res.redirect('/');
});

module.exports = router;
