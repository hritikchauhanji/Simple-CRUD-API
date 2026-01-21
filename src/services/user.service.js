import {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
} from "../validator/user.validator.js";
import AppError from "../utils/appError.js";

const createUserService = async (prisma, body) => {
  const data = createUserSchema.parse(body);

  const { name, email, age } = data;

  const existUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existUser) {
    throw new AppError("Email is already exists", 409);
  }

  return prisma.user.create({ data: { name, email, age } });
};

const getAllUsersService = async (prisma) => {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  if (users.length === 0) {
    throw new AppError("No users found", 404);
  }

  return users;
};

const getUserByIdService = async (prisma, params) => {
  const { id } = userIdSchema.parse(params);

  const user = await prisma.user.findFirst({
    where: { id, isActive: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const updateUserService = async (prisma, params, body) => {
  const { id } = userIdSchema.parse(params);
  const data = updateUserSchema.parse(body);
  const { name, age } = data;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, isActive: true },
  });

  if (!user || !user.isActive) {
    throw new AppError("User not found", 404);
  }

  return prisma.user.update({
    where: { id },
    data: {
      name,
      age,
    },
  });
};

const deleteUserService = async (prisma, params) => {
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
