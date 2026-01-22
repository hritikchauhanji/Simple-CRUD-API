import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email").max(50),
  age: z.number("Age must be a number").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
    ),
});

const userIdSchema = z.object({
  id: z.string().uuid("Invalid User Id").min(1, "User ID is required"),
});

const updateUserSchema = z
  .object({
    name: z.string().min(1).optional(),
    age: z.number("Age must be a number").optional(),
  })
  .passthrough();

const adminUpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  age: z.number("Age must be a number").optional(),
  email: z.string().email("Invalid email").optional(),
});

export {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
  adminUpdateUserSchema,
};
