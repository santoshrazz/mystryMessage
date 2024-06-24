import { z } from "zod";

const isValidUserName = z
  .string()
  .min(2, "username must be at least 2 charachters")
  .max(8, "Username no longer than 8 character");

export const signUpSchema = z.object({
  username: isValidUserName,
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(3, "Password at least 3 character long")
    .min(20, { message: "Password is too longer" }),
});
