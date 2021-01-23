/**
 * 로그인 관련 라우트
 */

const express = require('express');
const router = express.Router();

import { userInfo } from "os";
/**
 * Authentification Service / DTO
 */

import { 
  RefreshTokenGenerator,
  AccessTokenGenerator,
  VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { AuthService } from "../services/AuthService";
import { AccountService } from '../services/AccountService';
import { 
  AccountDTO,
  AccountVO 
} from "../Models/DTOs/AccountDTO";

import { ImageDTO } from '../Models/DTOs/ImageDTO';

/**
 * Get a Account VO
 */

router.post(
  '/account',
  VerifyAccessToken,
  async function(req, res) {
    const { _pk, _email, _name } = res.locals.jwt_payload;

    const result: AccountVO = {
      pk: _pk,
      email: _email,
      name: _name,
      profile_image: null,
      status_msg: null,
    };

    // < Success Message >
		return res.status(200).send({
			status  : 200,
			success : true,
      message : "success",
      data    : result 
		});
  });

/**
 * Login
 */
router.post(
  '/login',
  async function(req, res) {

    // < Login Account DTO Setting >
    // --------------------------------------------------
    const account_dto = new AccountDTO();
    account_dto.fromJson(req.body);

    // < Validate >
    // --------------------------------------------------
    const auth_service = new AuthService();
    const account = await auth_service.ValidateAccount(account_dto);

    // < Fail >
    // --------------------------------------------------
    if(!account) {
      return res.status(401).send({
        status : 401,
        success : true,
        message : "Fail : Not verify account",
      });
    }

    // < Generate Token >
    // --------------------------------------------------
    const _access_token = AccessTokenGenerator(account);
    const _refresh_token = RefreshTokenGenerator(account);

    await auth_service.SaveRefreshTokenDirectly(account, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : {
        access_token: _access_token,
        refresh_token: _refresh_token,
      }
    });
  }
);

/**
 * Registration Account
 */
router.post(
  '/registration', 
  async function(req, res) {
    const user_info = req.body;

    const account_service = new AccountService();
    const auth_service = new AuthService();

    // < Wrong Input >
    // --------------------------------------------------
    if(user_info.password != user_info.pw_confirm) {
      return res.status(409).send({
        status : 409,
        success : false,
        message : "Not match password and password confirm"
      });
    }

    // < Create Account DTO Setting >
    // --------------------------------------------------
    const account_dto = new AccountDTO();
    account_dto.fromJson(user_info)

    // < Create Image DTO Setting >
    // --------------------------------------------------
    let profile_img = null;

    if(user_info.profile_img_url) {
      profile_img = new ImageDTO();
      profile_img.url = user_info.profile_img_url;
    }

    // < Save & Generate Token >
    // --------------------------------------------------
    const account = await account_service.CreateAccount(account_dto, profile_img);

    const _access_token = AccessTokenGenerator(account);
    const _refresh_token = RefreshTokenGenerator(account);

    await auth_service.SaveRefreshTokenDirectly(account, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : {
        access_token: _access_token,
        refresh_token: _refresh_token,
      }
    });
  }
);

/**
 * Get Account
 */
router.post(
  '/account',
  VerifyAccessToken,
  async (req, res) => {
    const pk = res.locals.jwt_payload.pk;
    const token = res.locals.token;

    const auth_service = new AuthService();

    const account = await auth_service.ValidateRefreshToken(pk, token);

    // < Fail >
    // --------------------------------------------------
    if(!account) {
      return res.status(401).send({
        status : 401,
        success : true,
        message : "Fail : Not match Account and Refresh Token",
      });
    }

    // < Success // Generate Token >
    // --------------------------------------------------
    const result = AccessTokenGenerator(account);

    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : {
        access_token  : result,
        refresh_token : token,
      }
    });
  }
)


/**
 * 프로필 삭제
 */
router.delete(
  '/:usernum', 
  VerifyAccessToken,
  async function(req, res) {
    
    const pk = res.locals.jwt_payload.pk;
    const user_Info = req.body;
    const password = user_Info.password;

    const DeleteProfile = new AccountService();
    const Delete_Profile = await DeleteProfile.DeleteAccount(
        pk,
        password
    );
    
    if(!Delete_Profile){
        return res.status(403).send({
            status : 403,
            success : true,
            message : "Forbidden"
        });
    }
    
    return res.status(200).send({
        status : 200,
        success : true,
        message : "success"
    });

  }
);

module.exports = router;