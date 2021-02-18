import bodyParser from "body-parser";
import express, { Request, Response } from "express";

// util
import helmet from 'helmet'
import compression from 'compression';
import { routingControllerOptions } from "./Utils/RoutingConfig";
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from "routing-controllers";

<<<<<<< HEAD
const OAuthRouter = require('./OAuth/OAuth');
=======
// const passportRouter = require('./Middleware/passport/Passport');
>>>>>>> c355973947f70ebc06b38f96833bff92baaa21d4

import { appendFile } from "fs";
import { db_conn } from "./Utils/DB_Connection";
import { Connection } from "typeorm";
import Container from "typedi";

import { createServer, Server as httpServer } from "http";
import { SocketIO } from "./Utils/SocketIO_Connection";
import { initSwagger } from './Utils/Swagger';

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
      initSwagger(this.app);

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