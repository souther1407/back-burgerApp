import { createHash } from "crypto";
import config from "../config/config.js";

export const generateToken = (userName: string, password: string) => {
  return createHash("sha256")
    .update(userName + password + config.USER_TOKEN_SECRET)
    .digest("hex");
};
