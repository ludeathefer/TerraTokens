import { Request, Response, NextFunction } from "express";
import { connect } from "../db/connect";

async function dbConnectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await connect();
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection error" });
  }
}

export { dbConnectionMiddleware };
