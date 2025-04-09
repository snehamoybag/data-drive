import "express-session";
import { ValidationError } from "express-validator";

declare module "express-session" {
  interface SessionData {
    formErrors?: Record<string, ValidationError> | Record<string, string>;
    formValues?: Request["body"];
    successPageData?: {
      title: string;
      description: string;
      redirect: { path: string; text: string };
    };
  }
}
