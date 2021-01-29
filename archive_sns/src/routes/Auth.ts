const express = require('express');

/**
 * Authentification Service / DTO
 */

import { 
  RefreshTokenGenerator,
  AccessTokenGenerator,
  VerifyAccessToken 
} from "../Middleware/JWT_Auth";

import { 
  AccountDTO,
  AccountVO 
} from "../Models/DTOs/AccountDTO";

import { ImageDTO } from '../Models/DTOs/ImageDTO';

import { AccountService } from '../services/AccountService';
import { AuthService } from "../services/AuthService";

<<<<<<< HEAD
router.post(
  '/my_pk',
  VerifyAccessToken,
  async (req, res) => {
=======
export class AuthControl {
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264

  public router;

  private auth_service : AuthService;
  private account_service : AccountService;

  constructor(
    auth_service : AuthService,
    account_service : AccountService
  ) {

    this.auth_service    = auth_service;
    this.account_service = account_service

    this.router = express.Router();
    
    // < routing >
    this.router.post(
      "/login", 
      async (req, res) => this.login(req, res)
    );

<<<<<<< HEAD
/**
 * Login
 */
router.post(
  '/login',
  async (req, res) => {
=======
    this.router.post(
      '/registration', 
      async (req, res) => this.registration(req, res)
    );

    this.router.post(
      '/account', 
      VerifyAccessToken, 
      async (req, res) => this.account(req, res)
    );

    this.router.delete(
      '/:usernum', 
      VerifyAccessToken, 
      async (req, res) => this.delete(req, res)
    );

    this.router.post(
      '/short_info', 
      async (req, res) => this.short_info(req, res)
    );
  }

  /**
   * Login
   */
  
  private login = async function (req, res) {
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264

    // < Login Account DTO Setting >
    // --------------------------------------------------
    const account_dto = new AccountDTO();
    account_dto.fromJson(req.body);

    // < Validate >
    // --------------------------------------------------
    const account = await this.auth_service.ValidateAccount(account_dto);

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
    const _access_token = await AccessTokenGenerator(account);
    const _refresh_token = await RefreshTokenGenerator(account);

    await this.auth_service.SaveRefreshTokenDirectly(account, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: account.pk
      }
    });
  }

<<<<<<< HEAD
/**
 * Registration Account
 */
router.post(
  '/registration', 
  async (req, res) => {
=======
  /**
   * Registration Account
   */
   
  private registration = async function(req, res) {
      
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264
    const user_info = req.body;

    

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
    const account = await this.account_service.CreateAccount(account_dto, profile_img);

    const _access_token = AccessTokenGenerator(account);
    const _refresh_token = RefreshTokenGenerator(account);

    await this.auth_service.SaveRefreshTokenDirectly(account, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return res.status(200).send({
      status : 200,
      success : true,
      message : "success",
      data : {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: account.pk
      }
    });
  }


  /**
   * Get Account
   */
 
  private account = async (req, res) => {
    const pk = res.locals.jwt_payload.pk;
    const token = res.locals.token;

    const account = await this.auth_service.ValidateRefreshToken(pk, token);

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


<<<<<<< HEAD
/**
 * DeleteAccount
 * 
 * @param pk : jwt tokken
 * @param password : 
 */
router.delete(
  '/:usernum', 
  VerifyAccessToken,
  async (req, res) => {
=======
  /**
   * 프로필 삭제
   */
  
  private delete = async function(req, res) {
    
>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264
    const pk = res.locals.jwt_payload.pk;
    const user_Info = req.body;
    const password = user_Info.password;

    const Delete_Profile = await this.DeleteProfile.DeleteAccount(
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

<<<<<<< HEAD
/**
 * 
 * 
 * @param pk :
 */
router.post(
  '/short_info',
  async (req, res) => {
=======
  private short_info = async function(req, res) {

>>>>>>> 3998fca66adf99771446f8f7f4c9273606d6b264
      let result = undefined;

      if(req.body.pk) {
        result = await this.account_service.GetAccountByPK(req.body.pk);
      }

      if(result == undefined){
          return res.status(404).send({
              status : 404,
              success : false,
              message : "Not Found"
          });
      }

      return res.status(200).send({
          status : 200,
          success : true,
          message : "success",
          data: result
      });  
  }

}