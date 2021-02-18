import { env } from "../env";

export const routingControllerOptions = {
    cors: true,
    routePrefix: env.app.apiPrefix,
    controllers: [`${__dirname}/../Controller/*{.ts,.js}`],
    middlewares: [`${__dirname}/../Middleware/*{.ts,.js}`],
};
