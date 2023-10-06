import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  jwt: {
    COOKIE_NAME: process.env.COOKIE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  db: {
    DB_URL: process.env.DB_URL,
  },
};
