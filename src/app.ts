import Fastify from "fastify";
import prismaPlugin from "./config/prisma.js";
import userRoutes from "./routes/user.routes.js";
import cookie from "@fastify/cookie";
import authRoutes from "./routes/auth.routes.js";

const app = Fastify({
  logger: true,
});

app.register(prismaPlugin);
app.register(cookie);
app.register(userRoutes);
app.register(authRoutes);

// app.setErrorHandler(errorHandler);

app.get("/health", async () => {
  return {
    status: "ok",
    message: "Server is running.",
  };
});

export { app };
