import { App } from "./app";
import { env } from "./env";

try {
  const app = new App();
  const port: number = env.app.port || 8000;

  app.run(port);
} catch (error) {
  console.log("error : ", error);
}