import express from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import {
  submitContactForm,
  getMessagesForAdmin,
} from "../controller/contactUs/contact.controller";
import { validateContactForm } from "../Validator/contactValidator";

const router = express.Router();

// Route to handle contact form submission
router.post("/submit", submitContactForm);

// Route to retrieve messages for admin panel later add to admin panel
router.get("/messages", verifyJWT, getMessagesForAdmin);

export default router;
