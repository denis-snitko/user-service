import { Request, Response } from 'express';
import { idParam } from '../validations/user.schemas';
import * as userService from '../services/users.service';
import { Role } from '../types/roles.enum';

export async function getMeOrById(req: Request, res: Response) {
  const userJwt = req.user;
  const id = Number(idParam.parse(req.params).id);

  if (userJwt?.role !== Role.ADMIN && userJwt?.sub !== id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}

export async function list(req: Request, res: Response) {
  const users = await userService.listAll();
  res.json(users);
}

export async function block(req: Request, res: Response) {
  const userJwt = req.user;
  const id = Number(idParam.parse(req.params).id);

  if (userJwt?.role !== Role.ADMIN && userJwt?.sub !== id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const updated = await userService.blockUser(id);
  res.json(updated);
}
