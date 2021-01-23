import bodyParser from "body-parser";
import express, { Request, Response } from "express";

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { createServer, Server as httpServer } from "http";
import { WebSocket } from "./web_socket";

var indexRouter = require(__dirname+'/../src/routes/index');
var signupRouter = require('./routes/SignUp');

var FeedRouter = require(__dirname+'/../src/routes/Feed');
var profileRouter = require(__dirname+'/../src/routes/profile');
var commentRouter = require(__dirname+'/../src/routes/comment');
const feedlikeRouter = require(__dirname+'/../src/routes/feedlike');
// const commentlikeRouter = require(__dirname+'/../src/routes/commentlike');

const UploadRouter  = require('./routes/upload');
const AuthRouter = require('./routes/Auth');

export class App {
  private app: express.Application;
  private server: httpServer;

  constructor() {
    this.app = express();
    this.initDB();

    //@TODO : Integrate Routers
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    // this.app.use(helmet());
    // this.app.use(compression());
    
    this.app.use('/', indexRouter);
    this.app.use('/signup', signupRouter);
    this.app.use('/auth', AuthRouter);
    this.app.use('/Feed', FeedRouter);
    this.app.use('/profile', profileRouter);
    this.app.use('/upload', UploadRouter)
    this.app.use('/images', express.static('upload/Images/Profiles'));
    this.app.use('/comment', commentRouter)
    this.app.use('/feedlike', feedlikeRouter);
    // this.app.use('/commentlike', commentlikeRouter);

    this.server = createServer(this.app);
    WebSocket(this.server);
  }

  /**
   * DB Initializer
   */

  private async initDB(): Promise<void> {
    try {
      await db_conn();
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
      this.server.listen(port, () => {
      // this.server.listen(port, () => {
        console.log('Conneted ', port, ' port');
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}