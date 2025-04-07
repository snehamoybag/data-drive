import { RequestHandler } from "express";

export const renderLoginPage: RequestHandler = (req, res) => {
  res.render("root", {
    title: "Log in | Data Drive",
    page: "login",
  });
};
