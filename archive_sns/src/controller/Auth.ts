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

@JsonController("/auth")
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

  @HttpCode(200)
    @Post()
    @OpenAPI({
        summary: "registration/CreateAccount",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async CreateAccount(
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

    const CreateAccount_Result = await this.account_service.CreateAccount(account_dto);

    const _access_token = AccessTokenGenerator(CreateAccount_Result);
    const _refresh_token = RefreshTokenGenerator(CreateAccount_Result);

    await this.auth_service.SaveRefreshTokenDirectly(CreateAccount_Result, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: CreateAccount_Result.pk
    }
  }

  @HttpCode(200)
    @Post('/account')
    @OpenAPI({
        summary: "account",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    @UseBefore(VerifyAccessToken)
    public async ValidateRefreshToken(
      @Res() res: Response
      ) {
      const user_pk = res.locals.jwt_payload.pk;
      const token = res.locals.token;

      if(!user_pk || !token){
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "error user_pk or token"
        });
      }

      const ValidateRefreshToken_Result = await this.auth_service.ValidateRefreshToken(
        user_pk, 
        token
      );


      if(!ValidateRefreshToken_Result){
          return res.status(400).send({
          status: 400, 
          success: false, 
          message: "fail to ValidateRefreshToken_Result"
          });
      }

      return ValidateRefreshToken_Result;
    }

  @HttpCode(200)
  @Delete()
  @OpenAPI({
      summary: "delete",
      statusCode: "200",
      security: [{ bearerAuth: [] }],
  })
  @UseBefore(VerifyAccessToken)
  public async delete(
      @Req() req,
      @Res() res: Response
      ) {
      const user_pk = res.locals.jwt_payload.pk;

      const DeleteProfile_Result = await this.account_service.DeleteAccount(
        user_pk,
        req.body.password
      );

      if(!DeleteProfile_Result){
          return res.status(400).send({
          status: 400, 
          success: false, 
          message: "fail to DeleteProfile"
          });
      }

      return DeleteProfile_Result;
  }

  @HttpCode(200)
  @Get('/shortinfo')
  @OpenAPI({
      summary: "short_info",
      statusCode: "200",
      security: [{ bearerAuth: [] }],
  })
  @UseBefore(VerifyAccessToken)
  public async short_info(
    @Req() req,
    @Res() res: Response
    ) {
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

    return result;
  }
}