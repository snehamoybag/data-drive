import { Router } from "express";
import handleLogOutPost from "../controllers/logout.cotroller";

const logoutRoute = Router();

logoutRoute.post("/", handleLogOutPost);

export default logoutRoute;
