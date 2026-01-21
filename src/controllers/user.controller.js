import { success } from "zod";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";
import { handleError } from "../utils/errorHandler.js";

const createUser = async (req, reply) => {
  try {
    const user = await createUserService(req.server.prisma, req.body);
    return reply.code(201).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const getAllUsers = async (req, reply) => {
  try {
    const users = await getAllUsersService(req.server.prisma);
    return reply.code(200).send(users);
  } catch (error) {
    handleError(reply, error);
  }
};

const getUserById = async (req, reply) => {
  try {
    const user = await getUserByIdService(req.server.prisma, req.params);
    return reply.code(200).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const updateUser = async (req, reply) => {
  try {
    const user = await updateUserService(
      req.server.prisma,
      req.params,
      req.body,
    );
    return reply.code(200).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const deleteUser = async (req, reply) => {
  try {
    await deleteUserService(req.server.prisma, req.params);
    return reply
      .code(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    handleError(reply, error);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
