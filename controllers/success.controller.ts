import { RequestHandler } from "express";

export const renderSuccessPage: RequestHandler = (req, res) => {
  res.render("root", {
    page: "success",
    ...req.session.successPageData,
  });

  // clear session data
  req.session.successPageData = undefined;
};
