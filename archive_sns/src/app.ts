import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
import { WebSocket } from "./web_socket";
import { CommentRepo } from "./Models/Repositories/CommentRepo";

const passportRouter = require('./passport/passport');

// < Controls >
import { AuthControl } from './routes/Auth';
import { CommentControl } from './routes/comment';
import { CommentLikeControl } from './routes/commentlike';
import { PostControl } from './routes/Post';
import { FeedLikeControl } from './routes/feedlike';
import { ProfileControl } from "./routes/profile";

// < Services >
import { AuthService }                          from "./services/AuthService";
import { AccountService }                       from './services/AccountService';
import { PostCommentService }                   from './services/CommentService';
import { CommentLikeService, PostLikeService }  from "./services/LikeService";
import { PostService }                          from './services/PostService';
import { ChatGroupService, PostGroupService }   from './services/GroupService';
import { ChatService }                          from './services/ChatService';

  // ------------------------------------------------ //
 //  T E S T  //  T E S T  //  T E S T  //  T E S T  //
// ------------------------------------------------ //

import { ChatGroup } from './Models/Entities/Group';
import { GroupDTO } from './Models/DTOs/GroupDTO';
import { Account } from "./Models/Entities/Account";
import { ChatMsgDTO } from "./Models/DTOs/ChatDTO";
import { AccountDTO } from "./Models/DTOs/AccountDTO";
import { PostDTO } from './Models/DTOs/PostDTO';
import { PostImage } from "./Models/Entities/Image";
import { ImageDTO } from './Models/DTOs/ImageDTO';

// ------------------------------------------------ //


export class App {

  private app: express.Application;
  private server: httpServer;
  private db_conn: Connection;

  constructor() {
    this.app = express();
    this.initDB().then(() => {

      // Services
      const auth_service: AuthService = Container.get(AuthService);
      const account_service: AccountService = Container.get(AccountService);
      const post_comment_service: PostCommentService = Container.get(PostCommentService);
      const comment_like_service: CommentLikeService = Container.get(CommentLikeService);
      const post_service: PostService = Container.get(PostService);
      const post_like_service: PostLikeService = Container.get(PostLikeService);
      
      const chat_group_service: ChatGroupService = Container.get(ChatGroupService);
      const post_group_service: PostGroupService = Container.get(PostGroupService);

      const chat_service: ChatService = Container.get(ChatService);

      // Controls
    
      const auth_control = new AuthControl(auth_service, account_service);
      const comment_control = new CommentControl(post_comment_service);
      const comment_like_control = new CommentLikeControl(comment_like_service);
      const feed_control = new PostControl(post_service);
      const feed_like_control = new FeedLikeControl(post_like_service);
      const profile_control = new ProfileControl(account_service);

      // routing
      this.app.use('/passport', passportRouter);

      this.app.use('/auth', auth_control.router);
      this.app.use('/comment', comment_control.router);
      this.app.use('/commentlike', comment_like_control.router);
      this.app.use('/post', feed_control.router);
      this.app.use('/feedlike', feed_like_control.router);

      this.app.use("/static", express.static(__dirname + '/..'));

        // ------------------------------------------------ //
       //  T E S T  //  T E S T  //  T E S T  //  T E S T  //
      // ------------------------------------------------ //

      const user_a = "80e309ff-69e9-48e3-9925-b0a8e1d79e41";
      const user_b = "a5cb7733-b347-43d2-b93f-1b857db8e723";

      const group_a = "93bf1fe4-d7f1-4986-9dd8-e98c13e90f5b";
      const group_b = "f7e894a8-d269-49f8-8c94-5613c1c1f088";

      // const image_dto = new ImageDTO;
      // image_dto.url = "asdf";

      // console.log(image_dto)

      // post_image_service.UpdatePost(
      //   "1e4a0d14-4665-4e5d-9d97-891bdad0dab6",
      //   image_dto
      // )

      // < Account Create >
      // --------------------------------------------------
      // const account_dto = new AccountDTO;
      // account_dto.email = "test_1@test";
      // account_dto.name = "test_2";
      // account_dto.password = "test";

      // account_service.CreateAccount(account_dto, null);

      // account_dto.email = "test_2@test";
      // account_dto.name = "test_2";
      // account_dto.password = "test";

      // account_service.CreateAccount(account_dto, null);

      // < Post Create >
      // --------------------------------------------------
      // const post_dto = new PostDTO;
      // post_dto.title = "test_post_1";
      // post_dto.text_content = "test_post_1's content";
      
      // post_service.CreatePost(user_a, post_dto, null);

      // < ChatGroup Create >
      // --------------------------------------------------
      // const group_dto = new GroupDTO;
      // group_dto.title = "test_1";

      // let participant : string[] = [
      //   user_a,
      //   user_b
      // ]

      // chat_group_service.CreateGroup(group_dto, participant);
      
      // group_dto.title = "test_2";

      // chat_group_service.CreateGroup(group_dto, participant);

      // < CharMsg Create >
      // --------------------------------------------------
      // const chat_msg_dto = new ChatMsgDTO;
      // chat_msg_dto.content = "hello";

      // chat_service.SendMsg( 
      //   user_a, 
      //   group_a,
      //   chat_msg_dto 
      // );

      // chat_msg_dto.content = "what's up";

      // chat_service.SendMsg( 
      //   user_b, 
      //   group_a,
      //   chat_msg_dto 
      // );

      // chat_msg_dto.content = "hi";

      // chat_service.SendMsg( 
      //   user_a, 
      //   group_b,
      //   chat_msg_dto 
      // );

      // chat_msg_dto.content = "HOW R U";

      // chat_service.SendMsg( 
      //   user_b, 
      //   group_b,
      //   chat_msg_dto 
      // );

      // post_service.GetPostList(0, 5, null)
      // .then(result => console.log(result));

      // const result = chat_service.GetChatList(
      //   group_a, 0, 5
      // )
      // .then( result => console.log(result) );

      // ------------------------------------------------ //
    });
  }

  /**
   * DB Initializer
   */

  private async initDB(): Promise<void> {
    try {
      this.db_conn = await db_conn();
    } 
    catch (error) {
      console.log("didn't connect Database : \n", error);
    }
  }

  /**
   * Run Express Server
   * 
   * @param port Server Port Number
   */
  public async run(port: number) : Promise<void> {
    try {

      //@TODO : Integrate Routers
      this.app.use(bodyParser.urlencoded({extended: false}));
      this.app.use(bodyParser.json());
      // this.app.use(helmet());
      // this.app.use(compression());

      this.server = createServer(this.app);
      WebSocket(this.server);

      this.server.listen(port, () => {
        console.log('Conneted ', port, ' port');
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}