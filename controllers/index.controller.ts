import { RequestHandler } from "express";

export const renderIndexPage: RequestHandler = (req, res) => {
  const page = req.user ? "index-user" : "index-guest";

  res.render("root", {
    title: "Data Drive",
    page,
    user: req.user,
  });
};
