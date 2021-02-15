import bodyParser from "body-parser";
import express, { Request, Response } from "express";

// util
import helmet from 'helmet'
import compression from 'compression';
import { routingControllerOptions } from "./util/RoutingConfig";
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from "routing-controllers";

const passportRouter = require('./passport/passport');

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
// import { WebSocket } from "./web_socket";
import { CommentRepo } from "./Models/Repositories/CommentRepo";

// < Controls >
import { AuthControl } from './controller/Auth';
import { CommentControl } from './controller/comment';
import { CommentLikeControl } from './controller/commentlike';
import { PostControl } from './controller/Post';
import { FeedLikeControl } from './controller/feedlike';
import { ProfileControl } from "./controller/profile";
import { ChatControl } from "./controller/chat";

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
    this.setMiddlewares();
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
    }catch (error) {
      console.log("didn't connect Database : \n", error);
    }
  }

  /**
   * middleware
   */
  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
  }

  /**
   * Run Express Server
   */
  public async run(port: number) : Promise<void> {
    try {
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