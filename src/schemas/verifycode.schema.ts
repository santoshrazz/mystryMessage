import { z } from "zod";
export const verifyCodeSchema = z
  .string()
  .length(6, { message: "Verify code no longer or shorter than 6 digit" });
