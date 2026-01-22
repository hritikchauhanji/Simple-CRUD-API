import type { FastifyInstance } from "fastify";
import { login } from "../controllers/auth.controller.js";

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/auth/login", login);
};

export default authRoutes;
