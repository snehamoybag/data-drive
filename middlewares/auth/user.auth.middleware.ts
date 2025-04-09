import { RequestHandler } from "express";
import passport from "../../configs/passport.config";
import { AuthenticateCallback } from "passport";

const authenticateUser: RequestHandler = (req, res, next) => {
  const authenticateCB: AuthenticateCallback = (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      let errorMessage = "Login failed please try again later.";

      if (typeof info === "string") {
        errorMessage = info;
      }

      if (typeof info === "object" && "message" in info) {
        errorMessage = String(info.message);
      }

      req.session.formErrors = {
        auth: errorMessage,
      };
      req.session.formValues = req.body;

      return res.status(400).redirect("/login");
    }

    // login the user
    req.login(user, (err) => {
      if (err) {
        next(err);
      }

      next();
    });
  };

  return passport.authenticate("local", authenticateCB)(req, res, next);
};

export default authenticateUser;
