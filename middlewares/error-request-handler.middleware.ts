import "dotenv/config";
import { ErrorRequestHandler } from "express";
import ErrorPageData from "../types/error-page.type";

const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (process.env.ENVIRONMENT !== "production") {
    console.error(err);
  }

  const redirect = {
    path: "/",
    text: "Return to home page",
  };

  if (typeof err !== "object") {
    const data: ErrorPageData = {
      name: "UnknowError",
      statusCode: 500,
      message: "An unknown internal server error has occured.",
      redirect,
    };

    return res.status(500).render("error", data);
  }

  // if type of err is object
  // although some properties can be missing
  const data: ErrorPageData = {
    name: err.name || "UnknownError",
    statusCode: Number(err.status) || 500,
    message: err.message || "An unknown internal server error has occured.",
    redirect,
  };

  return res.status(err.status || 500).render("error", data);
};

export default errorRequestHandler;
