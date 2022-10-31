import dotenv from "dotenv";
dotenv.config();
const MOCK_HEROKU_DB_URL =
  "postgres://iwwrgcyvmevedt:848876c9e0c2bfc9b0c74fccab597a1c60345934519ed959d973f39066c24b22@ec2-35-170-21-76.compute-1.amazonaws.com:5432/d9uphu91j07qe2";
const config = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  DATABASE_URL: process.env.DATABASE_URL || MOCK_HEROKU_DB_URL,
  PASSWORD_SECRET: process.env.PASSWORD_SECRET,
  USER_TOKEN_SECRET: process.env.USER_TOKEN_SECRET,
  PORT: process.env.PORT || 8080,
};

export default config;
