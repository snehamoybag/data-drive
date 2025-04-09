import { RequestHandler } from "express";

export const renderLoginPage: RequestHandler = (req, res) => {
  res.render("root", {
    title: "Log in | Data Drive",
    page: "login",
    formValues: req.session.formValues,
    formErrors: req.session.formErrors,
  });

  // clear session data
  req.session.formValues = undefined;
  req.session.formErrors = undefined;
};

// run this after authentication middleware
export const handleSuccessfulLogin: RequestHandler = (req, res) => {
  return res.status(200).redirect("/");
};
