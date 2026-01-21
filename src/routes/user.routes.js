import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";

const userRoutes = async (fastify) => {
  fastify.post("/users", createUser);
  fastify.get("/users", getAllUsers);
  fastify.get("/users/:id", getUserById);
};

export default userRoutes;
