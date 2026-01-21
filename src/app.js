import Fastify from "fastify";
import prismaPlugin from "./config/prisma.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = Fastify({
  logger: true,
});

app.register(prismaPlugin);
app.register(userRoutes);

// app.setErrorHandler(errorHandler);

app.get("/health", async () => {
  return {
    status: "ok",
    message: "Server is running.",
  };
});

export { app };
