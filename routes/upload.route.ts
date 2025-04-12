import { Router } from "express";
import handleUploads from "../middlewares/handle-uploads.middleware";
import { handleUploadedFiles } from "../controllers/uploads.controller";

const uploadRoute = Router();

uploadRoute.post("/", handleUploads, handleUploadedFiles);

export default uploadRoute;
