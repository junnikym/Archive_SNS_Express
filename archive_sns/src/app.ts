import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
import { WebSocket } from "./web_socket";

// < Control >
import { AuthControl } from './routes/Auth';

// < Service >
import { AuthService } from "./services/AuthService";
import { AccountService } from './services/AccountService';
import { AccountRepo } from './Models/Repositories/AccountRepo';
import { ImageRepo } from './Models/Repositories/ImageRepo';

var indexRouter = require(__dirname+'/../src/routes/index');

var profileRouter = require(__dirname+'/../src/routes/profile');
var commentRouter = require(__dirname+'/../src/routes/comment');
const feedlikeRouter = require(__dirname+'/../src/routes/feedlike');
// const commentlikeRouter = require(__dirname+'/../src/routes/commentlike');

const UploadRouter  = require('./routes/upload');
const FeedRouter = require('./routes/Feed')

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

      // Controls
      const auth_control = new AuthControl(auth_service, account_service);

      // routing
      this.app.use('/auth', auth_control.router);
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
      
      // this.app.use('/', indexRouter);
      
      // this.app.use('/Feed', FeedRouter);
      // this.app.use('/profile', profileRouter);
      // this.app.use('/upload', UploadRouter);
      // this.app.use('/images', express.static('upload/Images/Profiles'));
      // this.app.use('/comment', commentRouter)
      // this.app.use('/feedlike', feedlikeRouter);
      // // this.app.use('/commentlike', commentlikeRouter);

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