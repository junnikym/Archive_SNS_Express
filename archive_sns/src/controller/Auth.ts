import { Response } from "express";
/**
 * Authentification Service / DTO
 */
import sanitizeHtml from 'sanitize-html';
import {
  JsonController,
  Get,
  Param,
  Body,
  Post,
  Put,
  UseBefore,
  Req,
  Res,
  Delete,
  HttpCode,
  QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
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

export class AuthControl {

  constructor(
    private auth_service : AuthService,
    private account_service : AccountService
  ) {}

  @HttpCode(200)
    @Get()
    @OpenAPI({
        summary: "login",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async login(
        @Body() Account_DTO: AccountDTO,
        @Req() req,
        @Res() res: Response,
    ) {
    Account_DTO.fromJson(req.body);
    const account = await this.auth_service.ValidateAccount(Account_DTO);

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

    const login = await this.auth_service.SaveRefreshTokenDirectly(
      account, 
      _refresh_token
    );

    if(!login) {
      return res.status(401).send({
        status : 400,
        success : true,
        message : "account or _refresh_token error",
      });
    }

    return {
      access_token: _access_token,
      refresh_token: _refresh_token,
      pk: account.pk
    };
  }


  /**
   * Registration Account
   */
  private registration = async function(req, res) {
    const s_password: string = sanitizeHtml(req.body.password);
    const s_pw_confirm: string = sanitizeHtml(req.body.pw_confirm);

    // < Wrong Input >
    // --------------------------------------------------
    if(s_password != s_pw_confirm) {
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

  @HttpCode(200)
    @Post()
    @OpenAPI({
        summary: "registration",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async registration(
        @Body() account_dto: AccountDTO,
        @Req() req,
        @Res() res: Response,
    ) {
    if(req.body.password != req.body.pw_confirm) {
      return res.status(409).send({
        status : 409,
        success : false,
        message : "Not match password and password confirm"
      });
    }

    account_dto.fromJson(req.body);

    let profile_img = null;

    if(req.body.profile_img_url) {
      profile_img = new ImageDTO();
      profile_img.url = req.body.profile_img_url;
    }

    const account = await this.account_service.CreateAccount(account_dto, profile_img);

    const _access_token = AccessTokenGenerator(account);
    const _refresh_token = RefreshTokenGenerator(account);

    await this.auth_service.SaveRefreshTokenDirectly(account, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: account.pk
    }
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


  /**
   * 프로필 삭제
   */
  
  private delete = async function(req, res) {

    const s_password: string = sanitizeHtml(req.body.password);
    const pk = res.locals.jwt_payload.pk;

    const Delete_Profile = await this.DeleteProfile.DeleteAccount(
        pk,
        s_password
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

  private short_info = async function(req, res) {
      const s_pk = sanitizeHtml(req.body.pk);

      let result = undefined;

      if(s_pk) {
        result = await this.account_service.GetAccountByPK(s_pk);
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