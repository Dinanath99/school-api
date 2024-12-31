import { body, param } from "express-validator";
import { handleValidationErrors } from "./validate";
import { HOUSE_ENUM } from "../utils/constants";
const isFutureDate = (value: string) => {
  const currentDate = new Date();
  const providedDate = new Date(value);
  return providedDate > currentDate;
};
// Middleware to validate the request body for creating a new newsletter
export const validateCreateNewsletter = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("updates").trim().notEmpty().withMessage("Updates are required"),
  body("announcements")
    .trim()
    .notEmpty()
    .withMessage("Announcements are required"),
  body("achievements")
    .trim()
    .notEmpty()
    .withMessage("Achievements are required"),
  body("upcomingEvents")
    .trim()
    .notEmpty()
    .withMessage("Upcoming events are required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("publicationDate")
    .optional({ nullable: true })
    .if((value: any) => value !== "")
    .custom(isFutureDate)
    .isISO8601()
    .toDate()
    .withMessage("Invalid publication date formatmm"),
  body("house")
    .notEmpty()
    .withMessage("House is required")
    .custom((value) => {
      if (!Object.values(HOUSE_ENUM).includes(value)) {
        throw new Error("Invalid house value");
      }
      return true;
    }),
  handleValidationErrors,
];

// Middleware to validate the request body for editing a newsletter
export const validateEditNewsletter = [
  param("id").isMongoId().withMessage("Invalid newsletter ID"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("updates").trim().notEmpty().withMessage("Updates are required"),
  body("announcements")
    .trim()
    .notEmpty()
    .withMessage("Announcements are required"),
  body("achievements")
    .trim()
    .notEmpty()
    .withMessage("Achievements are required"),
  body("upcomingEvents")
    .trim()
    .notEmpty()
    .withMessage("Upcoming events are required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("publicationDate")
    .optional({ nullable: true })
    .if((value: any) => value !== "")
    .custom(isFutureDate)
    .isISO8601()
    .toDate()
    .withMessage("Invalid publication date format"),
  body("house")
    .notEmpty()
    .withMessage("House is required")
    .custom((value) => {
      if (!Object.values(HOUSE_ENUM).includes(value)) {
        throw new Error("Invalid house value");
      }
      return true;
    }),
  handleValidationErrors,
];

// Middleware to validate the request parameter for deleting a newsletter
export const validateDeleteNewsletter = [
  param("id").isMongoId().withMessage("Invalid newsletter ID"),
  handleValidationErrors,
];
