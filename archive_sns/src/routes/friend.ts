/**
 *  friend 관련 라우트
 */

const express = require('express');

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { FriendService } from "../services/FriendService";

import { PostDTO } from '../Models/DTOs/PostDTO';
import { ImageDTO } from "../Models/DTOs/ImageDTO";

import { Post } from '../Models/Entities/Post';
import { FriendDTO } from "../Models/DTOs/FriendDTO";

export class FriendControl {

    public router;

    private FriendService : FriendService;

    constructor(
        FriendService : FriendService
    ) {

    this.FriendService = FriendService;

    this.router = express.Router();

    this.router.post(
        '/add',
        VerifyAccessToken,
        async (req, res) => this.AddFriend(req, res)
    );

    this.router.get(
        '/list/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.GetFriendList(req, res)
    );

    this.router.get(
        '/sendlist/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.GetSendList(req, res)
    );

    this.router.get(
        '/receivelist/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.GetReceiveList(req, res)
    );

    this.router.get(
        '/accept/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.AcceptFriend(req, res)
    );

    this.router.get(
        '/reject/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.RejectFriend(req, res)
    );

    this.router.delete(
        '/:account_pk',
        VerifyAccessToken,
        async (req, res) => this.DeleteFriend(req, res)
    );
}

/**
 * AddFriend
 * @param req 
 * @param res 
 */
private async AddFriend(req, res) {
    const account_pk = res.locals.jwt_payload.pk;
    const friend_pk = req.body.friend_pk;
    
    const Friend_DTO = new FriendDTO();
    Friend_DTO.account_pk = account_pk;
    Friend_DTO.friend_pk = friend_pk;

    const AddFriend_Result = await this.FriendService.AddFriend(
        Friend_DTO
    );
    
    if(!AddFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            AddFriend_Result
        }
    });
}

/**
 * GetFriendList
 * @param req 
 * @param res 
 */
private async GetFriendList(req, res) {
    const account_pk = req.params.account_pk;
    
    const GetFriendList_Result = await this.FriendService.GetFriendList(
        account_pk
    );

    if(!GetFriendList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            GetFriendList_Result
        }
    });
}

/**
 * GetSendList
 * @param req 
 * @param res 
 */
private async GetSendList(req, res) {
    const account_pk = req.params.account_pk;

    const GetSendList_Result = await this.FriendService.GetSendList(
        account_pk
    );

    if(!GetSendList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            GetSendList_Result
        }
    });
}

/**
 * GetReceiveList
 * @param req 
 * @param res 
 */
private async GetReceiveList(req, res) {
    const account_pk = req.params.account_pk;

    const GetReceiveList_Result = await this.FriendService.GetReceiveList(
        account_pk
    );

    if(!GetReceiveList_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            GetReceiveList_Result
        }
    });
}

/**
 * AcceptFriend
 * @param req 
 * @param res 
 */
private async AcceptFriend(req, res) {
    const account_pk = req.params.account_pk;
    const request_pk = req.body.request_pk;

    const AcceptFriend_Result = await this.FriendService.AcceptFriend(
        account_pk,
        request_pk
    );

    if(!AcceptFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            AcceptFriend_Result
        }
    });
}

/**
 * RejectFriend
 * @param req 
 * @param res 
 */
private async RejectFriend(req, res) {
    const account_pk = req.params.account_pk;
    const request_pk = req.body.request_pk;

    const RejectFriend_Result = await this.FriendService.RejectFriend(
        account_pk,
        request_pk
    );

    if(!RejectFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success",
        data : {
            RejectFriend_Result
        }
    });
}

/**
 * DeleteFriend
 * @param req 
 * @param res 
 */
private async DeleteFriend(req, res) {
    const account_pk = req.params.account_pk;
    const request_pk = req.body.request_pk;

    const DeleteFriend_Result = await this.FriendService.DeleteFriend(
        account_pk,
        request_pk
    );

    if(!DeleteFriend_Result){
        return res.status(400).send({
            status : 400,
            success : false,
            message : "Bad Request"
        });
    };

    return res.status(200).send({
        status : 200,
        success : true,
        message : "success"
    });
}

}