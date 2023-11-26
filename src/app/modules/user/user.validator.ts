import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last name must start with a capital letter',
    }),
});

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().refine((value) => value.trim() !== '', {
    message: 'City is required',
  }),
  country: z.string().refine((value) => value.trim() !== '', {
    message: 'Country is required',
  }),
});

const productSchema = z.object({
  productName: z.string().refine((value) => value.trim() !== '', {
    message: 'Product name is required',
  }),
  price: z.number().refine((value) => value > 0, {
    message: 'Price must be greater than 0',
  }),
  quantity: z.number().refine((value) => value > 0, {
    message: 'Quantity must be greater than 0',
  }),
});

export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().refine((value) => value.trim() !== '', {
    message: 'Username is required',
  }),
  password: z
    .string()
    .refine((value) => value.length >= 5 && value.length <= 20, {
      message: 'Password must be between 5 and 20 characters',
    }),
  fullName: fullNameSchema,
  age: z.number().optional(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(),
  address: addressSchema,
  orders: z.array(productSchema).optional(),
});
