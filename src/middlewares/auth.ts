import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { Role } from "../types/roles.enum";

export type JwtPayload = { sub: string; role: Role };

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = {
      ...decoded,
      sub: Number(decoded.sub),
    };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
