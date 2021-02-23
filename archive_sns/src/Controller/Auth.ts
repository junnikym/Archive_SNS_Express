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

import { AccountService } from '../Services/AccountService';
import { AuthService } from "../Services/AuthService";
import { ProfileImageMulter } from "../Middleware/Multer";

@JsonController("/auth")
export class AuthControl {

  constructor(
    private auth_service : AuthService,
    private account_service : AccountService
  ) {}

  @HttpCode(200)
  @Post('/login')
  @OpenAPI({
      summary: "login",
      statusCode: "200",
  })
  public async login(
    @Body() Account_DTO: AccountDTO,
    @Res() res: Response,
  ) {

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
        status : 401,
        success : true,
        message : "account or _refresh_token error",
      });
    }

    return {
      data: {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: account.pk
      }
    };
  }

  @HttpCode(200)
  @Post('/registration')
  @UseBefore(ProfileImageMulter.single('image'))
  @OpenAPI({
      summary: "registration",
      statusCode: "200",
      security: [{ bearerAuth: [] }],
  })
  public async registration(
      @Body() account_dto: AccountDTO,
      @Req() req,
      @Res() res: Response,
  ) {
    let profile_img = null;

    if(req.file.prfoile_img_url) {
      profile_img = new ImageDTO();
      profile_img.url = req.body.profile_img_url;
    }

    const CreateAccount_Result = 
      await this.account_service.CreateAccount(account_dto, profile_img);

    const _access_token = AccessTokenGenerator(CreateAccount_Result);
    const _refresh_token = RefreshTokenGenerator(CreateAccount_Result);

    await this.auth_service.SaveRefreshTokenDirectly(CreateAccount_Result, _refresh_token);

    // < Success >
    // --------------------------------------------------
    return {
      data: {
        access_token: _access_token,
        refresh_token: _refresh_token,
        pk: CreateAccount_Result.pk
      }
    };
  }

  @HttpCode(200)
    @Post('/account')
    @OpenAPI({
        summary: "account",
        statusCode: "200",
        security: [{ bearerAuth: [] }],
    })
    public async account(
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

      return { data: ValidateRefreshToken_Result };
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
    @Body() body,
    @Res() res: Response
  ) {
    const user_pk = res.locals.jwt_payload.pk;

    const DeleteProfile_Result = await this.account_service.DeleteAccount(
      user_pk,
      body.password
    );

    if(!DeleteProfile_Result){
        return res.status(400).send({
        status: 400, 
        success: false, 
        message: "fail to DeleteProfile"
        });
    }

    return { data : DeleteProfile_Result };
  }

}