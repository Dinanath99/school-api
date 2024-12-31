import { body } from "express-validator";
import { handleValidationErrors } from "./validate";
export const validateContactForm = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
  handleValidationErrors,
];
