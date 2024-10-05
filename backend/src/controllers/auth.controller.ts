import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import AuthService from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserService from "../services/user.service";
import { prisma } from "../prisma";
import { loginSchema, registerSchema } from "../types/auth.dto";

export const authController = new Hono<{ Variables: { user: any } }>();
const authService = AuthService();
const userService = UserService();

authController.get("/current", authMiddleware(), async (c) => {
  const user = c.get("user");
  return c.json(user);
});

authController.post("/login", zValidator("json", loginSchema), async (c) => {
  const dto = c.req.valid("json");

  const user = await userService.findByEmail(dto.email);

  if (!user) {
    return c.json({ message: "Not Found" }, 404);
  }

  const [salt, hash] = user.password.split(":");
  const passwordMatches = authService.verifyPassword(dto.password, hash, salt);

  if (!passwordMatches) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = await authService.getToken(user.id, user.email, user.name);

  return c.json({ token });
});

authController.post(
  "/register",
  zValidator("json", registerSchema),
  async (c) => {
    const dto = c.req.valid("json");

    const { hash, salt } = authService.hashPassword(dto.password);
    dto.password = `${salt}:${hash}`;

    const user = await prisma.user.create({
      data: dto,
    });

    return c.json({ id: user.id }, 201);
  }
);
