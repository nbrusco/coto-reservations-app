import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  db: {
    DB_URL: process.env.DB_URL,
  },
  mailing: {
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_PORT: parseInt(process.env.EMAIL_PORT),
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
  },
};
