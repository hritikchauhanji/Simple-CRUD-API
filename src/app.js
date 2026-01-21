import Fastify from "fastify";
import prismaPlugin from "./config/prisma.js";

const app = Fastify({
  logger: true,
});

app.register(prismaPlugin);

app.get("/health", async () => {
  return {
    status: "ok",
    message: "Server is running.",
  };
});

export { app };
