import { email, z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email").max(50),
  age: z.number("Age must be a number").optional(),
});

const userIdSchema = z.object({
  id: z.string().uuid("Invalid User Id").min(1, "User ID is required"),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  age: z.number("Age must be a number").optional(),
  email: z.never().optional(),
});

export { createUserSchema, userIdSchema, updateUserSchema };
