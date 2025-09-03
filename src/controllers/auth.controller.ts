import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../validations/auth.schemas';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const dto = registerSchema.parse(req.body);

  const user = await authService.register(dto);

  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const { email, password } = loginSchema.parse(req.body);

  const result = await authService.validateLogin(email, password);

  return res.json(result);
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  const tokens = await authService.refreshTokens(refreshToken);

  if (!tokens) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  return res.json(tokens);
}
