/**
 *  피드 관련 라우트
 */
var express = require('express');
var router = express.Router();

// JWT middleware
import { VerifyAccessToken } from "../Middleware/JWT_Auth";

import { PostService } from "../services/PostService";

import { CreatePostDTO } from '../Models/DTOs/PostDTO';
import { CreateImageDTO } from "../Models/DTOs/ImageDTO";


/**
 * 피드 보기
 */
router.get('/', function(req, res) {
    // var Feed = feed_show();
    // res.send(Feed);
});

/**
 * 피드 생성
 */
router.post(
  '/', 
  VerifyAccessToken,
  function(req, res) {
    const feed_Info = req.body;

    const PostDTO = new CreatePostDTO();        //피드 생성 DTO
    const ImgDTO = new CreateImageDTO();
    
    const Post_Create = new PostService();

    //토큰으로 wrter_pk 받아오기
    PostDTO.title = feed_Info.title;
    PostDTO.text_content = feed_Info.content; //DTO에 요청받은 데이터 삽입

    await Post_Create.CreatePost(
      res.locals.jwt_payload.pk, 
      PostDTO, 
      image
    );

    res.redirect('/');
});

/**
 * 피드 수정
 */
router.put('/:feednum', function(req, res) { 
  var feed_Info = req.body;
  var accountresult = account.feedAccount(feed_Info);
  if(accountresult){
    res.send('error!');
  }
  else{
    feed_update(feed_Info.feedNum, feed_Info.title, feed_Info.content,
      feed_Info.time, feed_Info.file_name, feed_Info.file_type, feed_Info.file_copied);
    res.redirect('/');
  }
});

/*
 * 피드 삭제 
 */  
router.delete('/:feednum', function(req, res) {
  var feed_Info = req.body;
  var feed_delete = feed_delete(feed_Info.feednum);
  res.send(feed_delete);
});

module.exports = router;