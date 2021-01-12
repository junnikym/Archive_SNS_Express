import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { appendFile } from "fs";
import { db_conn } from "./db_connection";

var indexRouter = require(__dirname+'/../src/routes/index');
var usersRouter = require(__dirname+'/../src/routes/users');
var signupRouter = require('./routes/SignUp');
var signInRouter = require(__dirname+'/../src/routes/signIn');
var FeedRouter = require(__dirname+'/../src/routes/Feed');

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initDB();

    //@TODO : Integrate Routers
    this.app.use(bodyParser.urlencoded({extended: false}));
    
    this.app.use('/', indexRouter);
    this.app.use('/users', usersRouter);
    this.app.use('/signup', signupRouter);
    this.app.use('/signIn', signInRouter);
    this.app.use('/Feed', FeedRouter);
    // this.app.use('/profile', profileRouter);
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