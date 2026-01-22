import type { PrismaClient } from "@prisma/client";
import { loginSchema } from "../validator/auth.validator.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const loginService = async (prisma: PrismaClient, body: any) => {
  const { email, password } = loginSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    throw new AppError("User does not exists", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { token, user };
};

export { loginService };
