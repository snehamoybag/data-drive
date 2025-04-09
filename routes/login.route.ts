import { Router } from "express";
import {
  handleSuccessfulLogin,
  renderLoginPage,
} from "../controllers/login.controller";
import authenticateUser from "../middlewares/auth/user.auth.middleware";

const loginRoute = Router();

loginRoute.get("/", renderLoginPage);
loginRoute.post("/", authenticateUser, handleSuccessfulLogin);

export default loginRoute;
