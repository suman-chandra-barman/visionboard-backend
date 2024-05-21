import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
const updateNameValidationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const userValidationSchema = z.object({
  body: z.object({
    name: nameValidationSchema,
    email: z.string().email(),
    password: z.string().min(4),
    gender: z.enum(['Male', 'Female', 'Other']),
    age: z.number().int().positive(),
    role: z.enum(['Manager', 'User']).default('User'),
    address: z.string(),
    contactNo: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: updateNameValidationSchema.optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    age: z.number().int().positive().optional(),
    address: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});

export const UserValidations = {
  userValidationSchema,
  updateUserValidationSchema,
};
