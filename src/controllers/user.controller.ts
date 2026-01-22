import { success } from "zod";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";
import { handleError } from "../utils/errorHandler.js";
import type { FastifyRequest, FastifyReply } from "fastify";

const createUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await createUserService(req.server.prisma, req.body);
    return reply.code(201).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await getAllUsersService(req.server.prisma);
    return reply.code(200).send(users);
  } catch (error) {
    handleError(reply, error);
  }
};

const getUserById = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await getUserByIdService(req.server.prisma, req.params);
    return reply.code(200).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const updateUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await updateUserService(
      req.server.prisma,
      req.params,
      req.body,
      req.user,
    );
    return reply.code(200).send(user);
  } catch (error) {
    handleError(reply, error);
  }
};

const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
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
