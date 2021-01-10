import express, { Request, Response } from "express";

import { db_conn } from "./db_connection";

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

      this.app.get('/', (req, res) => {
        res.send('Hello world');
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}
