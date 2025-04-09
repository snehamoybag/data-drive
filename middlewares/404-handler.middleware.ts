import { RequestHandler } from "express";
import ErrorPageData from "../types/error-page.type";

const handler404: RequestHandler = (req, res, next) => {
  const data: ErrorPageData = {
    name: "ErrorNotFound",
    statusCode: 404,
    message:
      "The resource you're looking for doesn't exist or may have been deleted permanently.",
    redirect: {
      path: "/",
      text: "Return to home page",
    },
  };

  return res.status(404).render("error", data);
};

export default handler404;
