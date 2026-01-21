import { createUserSchema } from "../validator/user.validator.js";

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

export { createUser };
