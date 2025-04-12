import { Request } from "express";
import { User } from "../generated/prisma";

export default interface AuthenticatedRequest extends Request {
  user: User;
}
