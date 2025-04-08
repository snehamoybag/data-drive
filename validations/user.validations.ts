import { body, ValidationChain } from "express-validator";
import prisma from "../configs/prisma.config";

export const validateName = (fieldName: string): ValidationChain => {
  return body(fieldName)
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a string (e.g. 'John Smith').")
    .isLength({ min: 3, max: 70 })
    .withMessage("Name must be between 3 and 70 chararcters long.");
};

export const validateEmail = (fieldName: string): ValidationChain => {
  const isNewEmail = async (emailValue: string) => {
    const user = await prisma.user.findUnique({
      where: { email: emailValue },
    });

    if (user) {
      // async callback must throw an error as the message
      throw new Error("Email is already in use.");
    }

    return true;
  };

  return body(fieldName)
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Unsupported email address type.")
    .custom(isNewEmail);
};

export const validatePassword = (fieldName: string): ValidationChain => {
  return body(fieldName)
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must be between 8 and 32 charancters long.");
};

export const validatePasswordConfirmation = (
  passwordFieldName: string,
  confirmedPasswordFieldName: string,
): ValidationChain => {
  return body(confirmedPasswordFieldName)
    .custom((confirmedPasswordValue, { req }) => {
      return confirmedPasswordValue === req.body[passwordFieldName];
    })
    .withMessage("Passwords do not match.");
};
