import type { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../config/env.js";
import { success } from "zod";
import { handleError } from "../utils/errorHandler.js";
import { loginService } from "../services/auth.service.js";

const login = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { token, user } = await loginService(req.server.prisma, req.body);

    const cookieOptions = {
      httpOnly: true,
      secure: env.nodeEnv == "production",
      sameSite: "strict" as const,
      path: "/",
    };

    return reply.setCookie("token", token, cookieOptions).send({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    handleError(reply, error);
  }
};

export { login };
