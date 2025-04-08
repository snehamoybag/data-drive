import { Router } from "express";
import { renderSuccessPage } from "../controllers/success.controller";

const successRoute = Router();

successRoute.get("/", renderSuccessPage);

export default successRoute;
