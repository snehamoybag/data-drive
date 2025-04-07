import { Router } from "express";
import { renderLoginPage } from "../controllers/login.controller";

const loginRoute = Router();

loginRoute.get("/", renderLoginPage);

export default loginRoute;
