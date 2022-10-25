import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../httpCodes.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(UNAUTHORIZED).json({ error: "no permitido" });
  else {
    req.headers.authorization = token;
    next();
  }
};

export const isTokenValid = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  try {
    const payload: any = jwt.verify(token, config.TOKEN_SECRET as string);
    req.user = { id: payload.id, token: payload.token };
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ error: true, ...(error as Error) });
  }
};
