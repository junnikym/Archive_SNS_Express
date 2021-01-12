import * as bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { db_conn } from "./db_connection";
// const app = express()
//@TODO : Have to modify routers url -> the way to delete __dirname

var indexRouter = require(__dirname+'/../src/routes/index');
var usersRouter = require(__dirname+'/../src/routes/users');
var signupRouter = require(__dirname+'/../src/routes/signUp');
var signInRouter = require(__dirname+'/../src/routes/signIn');
var FeedRouter = require(__dirname+'/../src/routes/Feed');
var profileRouter = require(__dirname+'/../src/routes/profile');
var commentRouter = require(__dirname+'/../src/routes/comment');

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

      //@TODO : Integrate Routers
      this.app.use(bodyParser.urlencoded({extended: false}));
      this.app.use('/', indexRouter);
      this.app.use('/signup', signupRouter);
      this.app.use('/signin', signInRouter);
      this.app.use('/Feed', FeedRouter);
      this.app.use('/profile', profileRouter);
      this.app.use('/comment', commentRouter);

      this.app.use(function(req, res, next) {      //페이지 주소 찾을수 없음
        res.status(404).send('cant find!!');
      })
      
      this.app.use(function(err, req, res, next) { //서버에 문제가 있을 경우
        console.error(err.stack)
        res.status(500).send('Something broke!!');
      })
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}
