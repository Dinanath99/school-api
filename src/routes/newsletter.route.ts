import express from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import {
  validateCreateNewsletter,
  validateEditNewsletter,
} from "../Validator/newsletterValidator";
import {
  createNewsLetterHandler,
  deleteNewsLetterHandler,
  editNewsLetterHandler,
  getNewsletter,
  getarchiveNewsletter,
} from "../controller/newsletter/newsletter.controller";
import { verifyRoles } from "../middleware/verifyRole";
import { validateDeleteBlogPost } from "../Validator/blogValidator";

const router = express.Router();
// Route to create a new newsletter
router.post(
  "/createletter",
  verifyJWT,
  verifyRoles("administrator", "house-leader"),
  createNewsLetterHandler
);
// Route to edit an existing newsletter
router.put(
  "/updateletter/:id",
  verifyJWT,
  verifyRoles("administrator", "house-leader"),
  editNewsLetterHandler
);

// Route to delete an existing newsletter
router.delete(
  "/deleteletter/:id",
  verifyJWT,
  verifyRoles("administrator", "house-leader"),
  validateDeleteBlogPost,
  deleteNewsLetterHandler
);

router.get(
  "/archive",
  verifyJWT,
  verifyRoles("administrator", "house-leader"),
  getarchiveNewsletter
);

router.get("/getletter", verifyJWT, getNewsletter);

export default router;
