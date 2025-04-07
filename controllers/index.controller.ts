import { RequestHandler } from "express";

export const renderIndexPage: RequestHandler = (req, res) => {
  res.render("root", {
    title: "Data Drive",
    page: "index-guest",
  });
};
