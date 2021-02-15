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

export class App {
  private app: express.Application;
  private server: httpServer;
  private db_conn: Connection;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.initDB();
  }

  // this.app.use("/static", express.static(__dirname + '/..'));

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
      routingUseContainer(Container);
      useExpressServer(this.app, routingControllerOptions);

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