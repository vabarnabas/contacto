import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string().min(3).max(255),
});

export const updateApplicationSchema = z.object({
  name: z.string().min(3).max(255).optional(),
});

export const applicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
});

export type Application = z.infer<typeof applicationSchema>;
export type CreateApplication = z.infer<typeof createApplicationSchema>;
export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
