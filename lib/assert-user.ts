import { Request } from "express";
import ErrorBadRequest from "./custom-errors/bad-request.error";
import { User } from "../generated/prisma";

const assertUser = (req: Request): User => {
  if (!req.user) {
    throw new ErrorBadRequest(
      "Request object returned without user unexpectedly.",
    );
  }

  if (!req.user.id) {
    throw new ErrorBadRequest("Request user does not have any id.");
  }

  return req.user;
};

export default assertUser;
