import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { prisma } from "../prisma";
import EncryptionService from "../services/encryption.service";

const encryptionService = EncryptionService();

export const apiKeyMiddleware = () => {
  return createMiddleware(async (c, next) => {
    const body = await c.req.json();
    const applicationId = body.applicationId as string;
    const apiKey = c.req.header("x-api-key");

    if (!apiKey || !applicationId) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { apiKeys: true },
    });

    if (!application) {
      return c.json({ message: "Not Found" }, 404);
    }

    if (
      application.apiKeys
        .map((k) => encryptionService.decrypt(k.key))
        .includes(apiKey)
    ) {
      return await next();
    } else {
      return c.json({ message: "Unauthorized" }, 401);
    }
  });
};
