import { RequestHandler } from "express";

export const renderSignupPage: RequestHandler = (req, res) => {
  res.render("root", {
    title: "Sign up | Data Drive",
    page: "signup",
  });
};
