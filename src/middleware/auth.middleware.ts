import type { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

const authenticate = async (req: FastifyRequest, _reply: FastifyReply) => {
  const token = req.cookies?.token;
  if (!token) throw new AppError("Unauthorized", 401);

  try {
    req.user = verifyToken(token);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Session expired. Please login again.", 401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid token. Please login again.", 401);
    }

    throw error;
  }
};

const authorize = (role: "ADMIN" | "USER") => async (req: FastifyRequest) => {
  if (req.user.role !== role) {
    throw new AppError("Forbidden", 403);
  }
};

export { authenticate, authorize };
