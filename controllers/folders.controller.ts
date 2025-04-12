import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";

export const renderFolderPage: RequestHandler = asyncHandler(
  async (req, res) => {
    console.log(req.params);
    res.send("path working");
  },
);
