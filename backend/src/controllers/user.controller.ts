import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { updateUserSchema } from "../types/user.dto";
import UserService from "../services/user.service";

export const userController = new Hono();
const userService = UserService();

userController.get("/", async (c) => {
  const users = await userService.findAll();
  return c.json(users);
});

userController.get("/:id", async (c) => {
  const { id } = c.req.param();

  const user = await userService.findById(id);

  if (!user) {
    return c.json({ message: "Not Found" }, 404);
  }

  return c.json(user);
});

userController.patch(
  "/:id",
  zValidator("json", updateUserSchema),
  async (c) => {
    const { id } = c.req.param();
    const data = c.req.valid("json");

    const user = await userService.update(id, data);

    return c.json(user);
  }
);

userController.delete(
  "/:id",

  async (c) => {
    const { id } = c.req.param();

    await userService.remove(id);

    return c.json("");
  }
);
