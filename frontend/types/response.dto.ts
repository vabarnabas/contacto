import { z } from "zod";

export const createResponseSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  message: z.string(),
  applicationId: z.string().uuid(),
});

export const responseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  message: z.string(),
  applicationId: z.string(),
});

export type Response = z.infer<typeof responseSchema>;
export type CreateResponse = z.infer<typeof createResponseSchema>;
