import "dotenv/config";

const requiredEnvs = ["PORT", "DATABASE_URL"];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
});

const env = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
};

export { env };
