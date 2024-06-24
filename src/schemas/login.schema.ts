import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(3, "Password at least 3 character long")
    .min(20, { message: "Password is too longer" }),
});
