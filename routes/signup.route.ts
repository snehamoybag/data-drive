import { Router } from "express";
import { renderSignupPage } from "../controllers/signup.controller";

const signupRoute = Router();

signupRoute.get("/", renderSignupPage);

export default signupRoute;
