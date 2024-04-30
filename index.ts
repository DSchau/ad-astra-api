import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import { version } from "./api/version";
import { router as response } from './api/response'
import { router as ingest } from './api/ingest'

const app = new Elysia({
  serve: {
    hostname: process.env.NODE_ENV === "production" ? "0.0.0.0" : "",
    port: parseInt(process.env.PORT || '3000', 10)
  },
})
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .use(swagger())
  .use(cors())
  .use(response)
  .use(ingest)
  .get("/version", version)
  .listen(process.env.WEBSOCKET_PORT || 8080);

export default app;
