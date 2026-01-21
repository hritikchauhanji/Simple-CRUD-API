import { createUserSchema, userIdSchema } from "../validator/user.validator.js";

const createUser = async (req, reply) => {
  const data = createUserSchema.parse(req.body);

  const existUser = await req.server.prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existUser) {
    return reply.code(409).send({ message: "Email is already exists" });
  }

  const user = await req.server.prisma.user.create({ data });
  reply.code(201).send(user);
};

const getAllUsers = async (req, reply) => {
  const users = await req.server.prisma.user.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  if (users.length === 0) {
    return reply.code(404).send({ message: "No users found" });
  }

  reply.code(200).send(users);
};

const getUserById = async (req, reply) => {
  userIdSchema.parse(req.params);

  const user = await req.server.prisma.user.findFirst({
    where: { id: req.params.id, isActive: true },
  });

  if (!user) {
    return reply.code(404).send({ message: "User not found" });
  }

  reply.code(200).send(user);
};

export { createUser, getAllUsers, getUserById };
