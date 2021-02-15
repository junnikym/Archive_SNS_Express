import bodyParser from "body-parser";
import express, { Request, Response } from "express";

// util
import helmet from 'helmet'
import sanitizeHtml from 'sanitize-html';
import compression from 'compression';

const passportRouter = require('./passport/passport');

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
// import { WebSocket } from "./web_socket";
import { CommentRepo } from "./Models/Repositories/CommentRepo";

// < Controls >
import { AuthControl } from './routes/Auth';
import { CommentControl } from './routes/comment';
import { CommentLikeControl } from './routes/commentlike';
import { PostControl } from './routes/Post';
import { FeedLikeControl } from './routes/feedlike';
import { ProfileControl } from "./routes/profile";
import { ChatControl } from "./routes/chat";

// < Services >
import { AuthService }                          from "./services/AuthService";
import { AccountService }                       from './services/AccountService';
import { PostCommentService }                   from './services/CommentService';
import { CommentLikeService, PostLikeService }  from "./services/LikeService";
import { PostService }                          from './services/PostService';
import { ChatGroupService, PostGroupService }   from './services/GroupService';
import { ChatService }                          from './services/ChatService';

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
      const chat_control = new ChatControl(chat_service);
      
      // util
      this.app.use(helmet());
      this.app.use(compression());

      // routing
      this.app.use('/auth', passportRouter);

      this.app.use('/auth', auth_control.router);
      this.app.use('/comment', comment_control.router);
      this.app.use('/commentlike', comment_like_control.router);
      this.app.use('/post', feed_control.router);
      this.app.use('/feedlike', feed_like_control.router);
      this.app.use('/chat', chat_control.router);

      this.app.use("/static", express.static(__dirname + '/..'));
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

      this.server = createServer(this.app);
      // WebSocket(this.server);

      this.server.listen(port, () => {
        console.log('Conneted ', port, ' port');
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }

}