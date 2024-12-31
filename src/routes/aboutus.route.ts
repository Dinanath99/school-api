import express from "express";
import {
  addAboutUsDetails,
  deleteAboutUsDetails,
  getAboutUsDetails,
  updateAboutUsDetails,
} from "../controller/aboutus/aboutus.controller";
import { verifyJWT } from "../middleware/verifyJWT";
import { verifyRoles } from "../middleware/verifyRole";

const router = express.Router();
router.get("/getdetails", getAboutUsDetails);
router.post(
  "/initialdetails",
  verifyJWT,
  verifyRoles("administrator"),
  addAboutUsDetails
);
router.patch(
  "/updatedetails/:id",
  verifyJWT,
  verifyRoles("administrator"),
  updateAboutUsDetails
);
router.delete(
  "/deletedetails/:id",
  verifyJWT,
  verifyRoles("administrator"),
  deleteAboutUsDetails
);

export default router;
