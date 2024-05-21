import { z } from 'zod';

const eyeglassValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number().positive(),
    brand: z.string(),
    quantity: z.number().int().positive(),
    frameMaterial: z.string(),
    frameShape: z.string(),
    lensType: z.string(),
    gender: z.enum(['Men', 'Women', 'Unisex', 'Kids']),
    color: z.string(),
    templeLength: z.number().int().positive(),
    bridgeSize: z.number().int().positive(),
    availability: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
  }),
});

const updateEyeglassValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    brand: z.string().optional(),
    quantity: z.number().int().positive().optional(),
    frameMaterial: z.string().optional(),
    frameShape: z.string().optional(),
    lensType: z.string().optional(),
    gender: z.enum(['Men', 'Women', 'Unisex', 'Kids']).optional(),
    color: z.string().optional(),
    templeLength: z.number().int().positive().optional(),
    bridgeSize: z.number().int().positive().optional(),
  }),
});

export const EyeglassValidations = {
  eyeglassValidationSchema,
  updateEyeglassValidationSchema,
};
