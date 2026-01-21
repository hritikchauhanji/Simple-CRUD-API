import { createUser, getAllUsers } from "../controllers/user.controller.js";

const userRoutes = async (fastify) => {
  fastify.post("/users", createUser);
  fastify.get("/users", getAllUsers);
};

export default userRoutes;
