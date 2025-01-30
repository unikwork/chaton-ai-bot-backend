import dotenv from "dotenv";
dotenv.config();

export default {
  protocol: process.env.PROTOCOL || "http",
  port: process.env.PORT || 3000,
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE_TIME,
  },
  certificate: {
    fullchain: process.env.CERTIFICATE_FULLCHAIN,
    privkey: process.env.CERTIFICATE_PRIVKEY,
  },
  openAI: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  subscription: {
    secretKey: process.env.SUBSCRIPTION_SECRET_KEY,
    environment: process.env.SUBSCRIPTION_ENVIRONMENT,
  },
  database: {
    database: process.env.DB_DATABASE || "chaton_ai_bot",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  },
};
