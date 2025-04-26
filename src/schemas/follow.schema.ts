import { z } from "zod";

export const followSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
});
