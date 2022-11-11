import dotenv from "dotenv";
dotenv.config();
const config = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  USER_TOKEN_SECRET: process.env.USER_TOKEN_SECRET,
  PORT: process.env.PORT || 8080,
};

export default config;
