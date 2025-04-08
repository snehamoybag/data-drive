import { Router } from "express";
import {
  handleSignupPost,
  renderSignupPage,
} from "../controllers/signup.controller";

const signupRoute = Router();

signupRoute.get("/", renderSignupPage);
signupRoute.post("/", handleSignupPost);

export default signupRoute;
