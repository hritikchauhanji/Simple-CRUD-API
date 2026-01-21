import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email").max(50),
  age: z.number().optional(),
});

export { createUserSchema };
