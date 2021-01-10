import express, { Request, Response } from "express";

import { db_conn } from "./db_connection";

//@TODO : Have to modify routers url -> the way to delete __dirname

var indexRouter = require(__dirname+'/../src/routes/index');
var usersRouter = require(__dirname+'/../src/routes/users');
var signupRouter = require(__dirname+'/../src/routes/signUp');
var signInRouter = require(__dirname+'/../src/routes/signIn');
var FeedRouter = require(__dirname+'/../src/routes/Feed');

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

      this.app.use('/', indexRouter);
      this.app.use('/users', usersRouter);
      this.app.use('/signUp', signupRouter);
      this.app.use('/signIn', signInRouter);
      this.app.use('/Feed', FeedRouter);
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}
