import { Request, Response } from "express";
import { BlogPost } from "../../models/blog.model";
import { User } from "../../models/user.model";
export const addCommentToBlogPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    // Extract username from the user object
    const username = user.username;
    // Find the blog post by ID
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Blog post not found" });
    }
    const newComment = {
      author: username,
      content,
      createdAt: new Date(),
    };
    // Add the new comment to the blog post
    blogPost.comments.push(newComment);
    await blogPost.save();

    res.status(201).json({
      status: true,
      message: "Comment added successfully",
      data: blogPost,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
