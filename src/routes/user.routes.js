import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = async (fastify) => {
  fastify.post("/users", createUser);
  fastify.get("/users", getAllUsers);
  fastify.get("/users/:id", getUserById);
  fastify.patch("/users/:id", updateUser);
  fastify.delete("/users/:id", deleteUser);
};

export default userRoutes;
