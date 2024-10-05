import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import * as dotenv from "dotenv";
import { applicationController } from "./controllers/application.controller";
import { userController } from "./controllers/user.controller";
import { authController } from "./controllers/auth.controller";

dotenv.config();

const app = new Hono();

app.use(cors());
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/applications", applicationController);
app.route("/users", userController);
app.route("/auth", authController);

const port = parseInt(process.env.PORT || "3000");
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
