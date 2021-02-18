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

const OAuthRouter = require('./OAuth/OAuth');

import { appendFile } from "fs";
import { db_conn } from "./db_connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
import { SocketIO } from "./socket_io_connection";

export class App {
  private app: express.Application;
  private server: httpServer;
  private db_conn: Connection;
  private socket_io: SocketIO;

  constructor() {
    this.app = express();
    this.setMiddlewares();
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

      this.initDB().then(() => {
        // server init
        this.server = createServer(this.app);

        // socket io
        this.socket_io = new SocketIO;
        this.app.set('socket_io', this.socket_io);
        this.socket_io.connect(this.server);

        // run
        this.server.listen(port, () => {
          console.log('Conneted ', port, ' port');

        // OAuth
        this.app.use('/auth', OAuthRouter);
        });
      });
    }
    catch (error) {
      console.log("error : ", error);
    }
  }
}