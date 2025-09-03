import { Role } from "../types/roles.enum";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      sub: number;
      role: Role;
    };
  }
}
