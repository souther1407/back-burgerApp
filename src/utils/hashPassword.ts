import { createHash } from "crypto";
import config from "../config/config.js";
export const hashPassword = (password: string) => {
  return createHash("sha256")
    .update(password + config.PASSWORD_SECRET)
    .digest("hex");
};
