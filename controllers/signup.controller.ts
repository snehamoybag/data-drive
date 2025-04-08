import { RequestHandler } from "express";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "../validations/user.validations";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import prisma from "../configs/prisma.config";

export const renderSignupPage: RequestHandler = (req, res) => {
  res.render("root", {
    title: "Sign up | Data Drive",
    page: "signup",
    formValues: req.session.formvalues || {},
    formErrors: req.session.formErrors || {},
  });

  // clear session datas
  req.session.formErrors = undefined;
  req.session.formvalues = undefined;
};

export const handleSignupPost: RequestHandler[] = [
  validateName("name"),
  validateEmail("email"),
  validatePassword("password"),
  validatePasswordConfirmation("password", "confirmedPassword"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.session.formvalues = req.body;
      req.session.formErrors = errors.mapped();

      return res.status(400).redirect("/signup");
    }

    // if no errors
    const passwordHash = await bcrypt.hash(req.body.confirmedPassword, 10);

    await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        passwordHash: passwordHash,
      },
    });

    // redirect them to a success page
    req.session.successPageData = {
      title: "Sign up successful!",
      description:
        "Congratulations you are now a member of Data Drive! Please follow the link below to login using your email address and password",
      redirect: {
        path: "/login",
        text: "Log in",
      },
    };

    res.status(200).redirect("/success");
  }),
];
