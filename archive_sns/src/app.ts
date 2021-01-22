import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { appendFile } from "fs";
import { db_conn } from "./db_connection";

var indexRouter = require(__dirname+'/../src/routes/index');

var FeedRouter = require(__dirname+'/../src/routes/Feed');
var profileRouter = require(__dirname+'/../src/routes/profile');
var commentRouter = require(__dirname+'/../src/routes/comment');

const TestRouter    = require('./routes/test');
const UploadRouter  = require('./routes/upload');
const AuthRouter = require('./routes/Auth');

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// npm install --save helmet  보안
// var helmet = require('helmet');
// this.app.use(helmet());

// npm install nsp -g 쿠키관련보안
// nsp check

// var compression = require('compression') 압축
// app.use(compression());

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initDB();

    //@TODO : Integrate Routers
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    
    this.app.use('/', indexRouter);
    
    // Authentifications
    this.app.use('/auth', AuthRouter);

    this.app.use('/Feed', FeedRouter);
    this.app.use('/profile', profileRouter);

    this.app.use('/test', TestRouter);
    this.app.use('/upload', UploadRouter)

    this.app.use('/images', express.static('upload/Images/Profiles'));
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
      this.app.listen(port, () => {
        console.log('Conneted ', port, ' port');
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}