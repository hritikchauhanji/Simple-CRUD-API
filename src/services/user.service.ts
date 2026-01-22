import {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
  adminUpdateUserSchema,
} from "../validator/user.validator.js";
import AppError from "../utils/appError.js";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const createUserService = async (prisma: PrismaClient, body: unknown) => {
  const { name, email, age, password } = createUserSchema.parse(body);

  const existUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existUser) {
    throw new AppError("Email is already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      age,
      password: hashedPassword,
      role: Role.USER,
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

const getAllUsersService = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany({
    where: { isActive: true, role: Role.USER },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      role: true,
      createdAt: true,
    },
  });

  if (users.length === 0) {
    throw new AppError("No users found", 404);
  }

  return users;
};

const getUserByIdService = async (prisma: PrismaClient, params: unknown) => {
  const { id } = userIdSchema.parse(params);

  const user = await prisma.user.findFirst({
    where: { id, isActive: true },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUserService = async (
  prisma: PrismaClient,
  params: unknown,
  body: unknown,
  currentUser: { id: string; role: Role },
) => {
  const { id } = userIdSchema.parse(params);
  const data =
    currentUser.role === Role.ADMIN
      ? adminUpdateUserSchema.parse(body)
      : updateUserSchema.parse(body);

  const { name, age, email } = data as {
    name?: string;
    age?: number;
    email?: string;
  };

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, isActive: true },
  });

  if (!user || !user.isActive) {
    throw new AppError("User not found", 404);
  }

  if (email && currentUser.role !== Role.ADMIN) {
    throw new AppError("You are not allowed to update email", 403);
  }

  if (email) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailExists && emailExists.id !== id) {
      throw new AppError("Email already in use", 409);
    }
  }

  return prisma.user.update({
    where: { id },
    data: {
      name,
      age,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      role: true,
      createdAt: true,
    },
  });
};

const deleteUserService = async (prisma: PrismaClient, params: unknown) => {
  const { id } = userIdSchema.parse(params);

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, isActive: true },
  });

  if (!user || !user.isActive) {
    throw new AppError("User not found", 404);
  }

  await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });

  return true;
};

export {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
