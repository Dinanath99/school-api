import express from "express";
import authRouter from "./auth.route";
import blogRouter from "./blog.route";
import contactRouter from "./contactUs.route";
import aboutUsRouter from "./aboutus.route";
import eventRouter from "./events.route"
import newsletterRouter from "./newsletter.route";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/about", aboutUsRouter);
router.use("/blog", blogRouter);
router.use("/events", eventRouter);
router.use("/contact", contactRouter);
router.use("/newsletter", newsletterRouter);
export default router;