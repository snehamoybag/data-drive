import { Router } from "express";
import { renderIndexPage } from "../controllers/index.controller";

const indexRoute = Router();

indexRoute.get("/", renderIndexPage);

export default indexRoute;
