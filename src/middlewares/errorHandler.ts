import { ZodError } from "zod";
import { logger } from "../logger";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(`Unhandled error: ${err.message}`, { error: err });

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const status = err.status ?? 500;
  res.status(status).json({ message: err.message ?? "Internal Server Error" });
}
