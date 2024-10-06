import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(3).max(255),
  userId: z.string().uuid(),
});

export const createApiKeySchema = z.object({
  name: z.string(),
  applicationId: z.string(),
  // validUntil: z.string().date(),
});

export const updateApplicationSchema = z.object({
  name: z.string().min(3).max(255).optional(),
});

export const apiKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  applicationId: z.string(),
  validUntil: z.string().date().nullable(),
});

export const applicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
});

export type Application = z.infer<typeof applicationSchema>;
export type CreateApplication = z.infer<typeof createApplicationSchema>;
export type UpdateApplication = z.infer<typeof updateApplicationSchema>;

export type ApiKey = z.infer<typeof apiKeySchema>;
export type CreateApiKey = z.infer<typeof createApiKeySchema>;
