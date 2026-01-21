import { createUser } from "../controllers/user.controller.js";

const userRoutes = async (fastify) => {
  fastify.post("/users", createUser);
};

export default userRoutes;
