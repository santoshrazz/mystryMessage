import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(5, { message: "content must be at least 5 character" })
    .max(300, { message: "content Should be longer than 300 character" }),
});
