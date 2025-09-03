import { z } from 'zod';
import { Role } from '../types/roles.enum';

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Поле fullName обязательно и должно содержать не менее 3 символов'),
  birthDate: z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val)), {
      message: 'birthDate должен быть в формате YYYY-MM-DD',
    })
    .transform((val) => new Date(val)),
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен быть не короче 8 символов'),
  role: z.enum(Object.values(Role) as [string, ...string[]]),
});
export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginDTO = z.infer<typeof loginSchema>;
