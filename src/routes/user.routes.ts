import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import type { FastifyInstance } from "fastify";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/users", createUser);
  fastify.get(
    "/admin/users",
    { preHandler: [authenticate, authorize("ADMIN")] },
    getAllUsers,
  );
  fastify.get(
    "/admin/users/:id",
    { preHandler: [authenticate, authorize("ADMIN")] },
    getUserById,
  );
  fastify.patch("/users/:id", { preHandler: authenticate }, updateUser);
  fastify.delete("/users/:id", { preHandler: authenticate }, deleteUser);
};

export default userRoutes;
