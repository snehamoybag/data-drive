import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../configs/prisma.config";
import ErrorBadRequest from "../lib/custom-errors/bad-request.error";
import assertUser from "../lib/assert-user";

export const handleUploadedFiles: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = assertUser(req);

    if (!req.file) {
      throw new ErrorBadRequest(
        "Request object returned wihout uploaded file unexpectedly.",
      );
    }

    const file = req.file;

    await prisma.file.create({
      data: {
        name: file.filename,
        mimeType: file.mimetype,
        size: BigInt(file.size), // in bytes
        url: file.destination,
        ownerId: user.id,
      },
    });

    req.session.successPageData = {
      title: "Upload Successful!",
      description: `File uploaded successfully.`,
      redirect: {
        path: req.get("referrer") || "/",
        text: "Go back",
      },
    };

    res.status(200).redirect("/success");
  },
);
