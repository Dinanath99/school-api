import { body, param } from "express-validator";
import { handleValidationErrors } from "./validate";

// Middleware to validate the request body for creating a new comment
export const validateCreateComment = [
  body("content").trim().notEmpty().withMessage("Content is required"),
  handleValidationErrors,
];

// Middleware to validate the request body for editing a comment
export const validateEditComment = [
  param("id").isMongoId().withMessage("Invalid comment ID"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  handleValidationErrors,
];

// Middleware to validate the request parameter for deleting a comment
export const validateDeleteComment = [
  param("id").isMongoId().withMessage("Invalid comment ID"),
  handleValidationErrors,
];
