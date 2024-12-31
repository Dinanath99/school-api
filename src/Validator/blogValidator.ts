import { body, param } from "express-validator";
import { handleValidationErrors } from "./validate";
const isFutureDate = (value: string) => {
  const currentDate = new Date();
  const providedDate = new Date(value);
  return providedDate > currentDate;
};
// Middleware to validate the request body for creating a new blog post
export const validateCreateBlogPost = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  ,
  //body("publicationDate")
  //   .optional({ nullable: true })
  //   .if((value: any) => value !== "")
  //   .custom(isFutureDate)
  //   .isISO8601()
  //   .toDate()
  //   .withMessage("Invalid publication date format")
  handleValidationErrors,
];

// Middleware to validate the request body for editing a blog post
export const validateEditBlogPost = [
  param("id").isMongoId().withMessage("Invalid blog post ID"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  handleValidationErrors,
  body("publicationDate")
    .optional({ nullable: true })
    .if((value: any) => value !== "")
    .isISO8601()
    .toDate()
    .withMessage("Invalid publication date format"),
];

// Middleware to validate the request parameter for deleting a blog post
export const validateDeleteBlogPost = [
  param("id").isMongoId().withMessage("Invalid blog post ID"),
  handleValidationErrors,
];
