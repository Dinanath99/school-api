import express, { Request, Response, NextFunction } from "express";
import {
  createBlogPostHandler,
  deleteBlogPostHandler,
  editBlogPostHandler,
  getAllBlogPosts,
  getBlogPostById,
} from "../controller/blog/blog.controller";
import {
  validateCreateBlogPost,
  validateDeleteBlogPost,
  validateEditBlogPost,
} from "../Validator/blogValidator";
import { verifyJWT } from "../middleware/verifyJWT";
import { addCommentToBlogPost } from "../controller/blog/comment.controller";
import { validateCreateComment } from "../Validator/commentValidator";

const router = express.Router();
router.post("/createblog", verifyJWT, createBlogPostHandler);
router.get("/getblog", getAllBlogPosts);
router.get("/getblogbyid/:id", getBlogPostById);
router.put(
  "/updateblog/:id",
  verifyJWT,
  validateEditBlogPost,
  editBlogPostHandler
);
router.delete(
  "/deleteblog/:id",
  verifyJWT,
  validateDeleteBlogPost,
  deleteBlogPostHandler
);
router.post(
  "/addcomment/:postId",
  verifyJWT,
  validateCreateComment,
  addCommentToBlogPost
);
export default router;
