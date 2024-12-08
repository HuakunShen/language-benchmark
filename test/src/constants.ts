import { z } from "zod";

export const POCKETBASE_URL = z.string().parse(Bun.env.POCKETBASE_URL);
export const POCKETBASE_USERNAME = z
  .string()
  .email()
  .parse(Bun.env.POCKETBASE_USERNAME);
export const POCKETBASE_PASSWORD = z
  .string()
  .parse(Bun.env.POCKETBASE_PASSWORD);
