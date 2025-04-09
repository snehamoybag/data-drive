import { RequestHandler } from "express";

const handleLogOutPost: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.status(200).redirect("/");
  });
};

export default handleLogOutPost;
