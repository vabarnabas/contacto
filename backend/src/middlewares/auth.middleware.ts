import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authMiddleware = () => {
  return createMiddleware(async (c, next) => {
    const tokenSecret = process.env.JWT_SECRET!;
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    try {
      const payload = await verify(token, tokenSecret);
      c.set("user", payload);
      return await next();
    } catch {
      return c.json({ message: "Unauthorized" }, 401);
    }
  });
};
