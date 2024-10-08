import { Hono } from "hono";
import ResponseService from "../services/response.service";
import { zValidator } from "@hono/zod-validator";
import { createResponseSchema } from "../types/response.dto";
import { apiKeyMiddleware } from "../middlewares/api-key.middleware copy";
import { authMiddleware } from "../middlewares/auth.middleware";

const responseService = ResponseService();
export const responseController = new Hono();

responseController.get("/", async (c) => {
  const responses = await responseService.findAll();

  return c.json(responses);
});

responseController.get("/:id", async (c) => {
  const { id } = c.req.param();

  const application = await responseService.findSpecific(id);
  return c.json(application);
});

responseController.get("/application/:id", async (c) => {
  const { id } = c.req.param();

  const responses = await responseService.findByApplicationId(id);
  return c.json(responses);
});

responseController.post(
  "/",
  zValidator("json", createResponseSchema),
  apiKeyMiddleware(),
  async (c) => {
    const dto = c.req.valid("json");

    try {
      const response = await responseService.create(dto);
      return c.json(response);
    } catch {
      return c.json({ message: "An error occurred" }, 500);
    }
  }
);

responseController.delete("/:id", authMiddleware(), async (c) => {
  const { id } = c.req.param();

  try {
    await responseService.remove(id);
    return c.json({ message: "Success" });
  } catch {
    return c.json({ message: "An error occurred" }, 500);
  }
});
