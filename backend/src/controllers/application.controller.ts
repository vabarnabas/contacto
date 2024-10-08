import { Hono } from "hono";
import ApplicationService from "../services/application.service";
import { zValidator } from "@hono/zod-validator";
import {
  createApiKeySchema,
  createApplicationSchema,
  updateApplicationSchema,
} from "../types/application.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

export const applicationController = new Hono();

const applicationService = ApplicationService();

applicationController.get("/", authMiddleware(), async (c) => {
  const applications = await applicationService.findAll();
  return c.json(applications);
});

applicationController.get("/:id", authMiddleware(), async (c) => {
  const { id } = c.req.param();

  const application = await applicationService.findSpecific(id);
  return c.json(application);
});

applicationController.post(
  "/",
  authMiddleware(),
  zValidator("json", createApplicationSchema),
  async (c) => {
    const dto = c.req.valid("json");

    try {
      const application = await applicationService.create(dto);
      return c.json(application);
    } catch {
      return c.json({ message: "An error occurred" }, 500);
    }
  }
);

applicationController.post(
  "/api-keys",
  authMiddleware(),
  zValidator("json", createApiKeySchema),
  async (c) => {
    const dto = c.req.valid("json");

    try {
      const apiKey = await applicationService.createApiKey(dto);
      return c.json(apiKey);
    } catch {
      return c.json({ message: "An error occurred" }, 500);
    }
  }
);

// applicationController.get("/my", async (c) => {
//   const applications = await applicationService.findMy(userId);
//   return c.json(applications);
// });

applicationController.patch(
  "/:id",
  authMiddleware(),
  zValidator("json", updateApplicationSchema),
  async (c) => {
    const { id } = c.req.param();
    const dto = c.req.valid("json");

    try {
      const application = await applicationService.update(id, dto);
      return c.json(application);
    } catch {
      return c.json({ message: "An error occurred" }, 500);
    }
  }
);

applicationController.delete("/:id", async (c) => {
  const { id } = c.req.param();

  try {
    await applicationService.remove(id);
    return c.json({ message: "Application deleted" });
  } catch {
    return c.json({ message: "An error occurred" }, 500);
  }
});

applicationController.delete("/api-keys/:id", async (c) => {
  const { id } = c.req.param();

  try {
    await applicationService.removeApiKey(id);
    return c.json({ message: "API Key deleted" });
  } catch {
    return c.json({ message: "An error occurred" }, 500);
  }
});
