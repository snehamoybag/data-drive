import { RequestHandler } from "express";
import multer from "multer";
import ErrorBadRequest from "../lib/custom-errors/bad-request.error";
import fs from "node:fs";

const mkdirIfNotExistsAsync = async (path: string) => {
  fs.access(path, (err) => {
    // if no error, directory exists
    if (!err) return;

    fs.mkdir(path, (err) => {
      if (err) throw err;
    });
  });
};

const errorMessge = "User not found.";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (!req.user) {
      throw new ErrorBadRequest(errorMessge);
    }

    const path = `uploads/${req.user.id}`;
    await mkdirIfNotExistsAsync(path);
    cb(null, path);
  },
});

const upload = multer({ storage: storage });

// make sure the field name of the file upload input is 'files'
const handleUploads: RequestHandler = upload.single("files");

export default handleUploads;
