import { Router } from "express";
import { renderFolderPage } from "../controllers/folders.controller";

const foldersRoute = Router();

foldersRoute.get("/", renderFolderPage);

export default foldersRoute;
