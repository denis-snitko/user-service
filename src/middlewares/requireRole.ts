import { Request, Response, NextFunction } from "express";
import { Role } from "../types/roles.enum";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (user?.role !== Role.ADMIN)
    return res.status(403).json({ message: "Forbidden" });

  next();
}
