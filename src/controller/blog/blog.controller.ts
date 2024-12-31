import { Request, Response } from "express";
import { BlogPost } from "../../models/blog.model";
import { User } from "../../models/user.model";
// Controller function to create a new blog post

export const createBlogPostHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const { author, title, content, house, publicationDate,description } = req.body;

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    // Default status to "draft"
    let status = "draft";

    // Check if publication date is provided and valid
    if (publicationDate && new Date(publicationDate) <= new Date()) {
      status = "published";
    }

    // Create new blog post
    const newBlogPost = await BlogPost.create({
      status,
      title,
      author: author,
      contentType: "normal",
      content,
      house,
      publicationDate: publicationDate ? new Date(publicationDate) : new Date(),
      description
    });

    res.status(201).json(newBlogPost); // Return the newly created blog post
  } catch (error) {
    console.error("Error creating blog post:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
// Controller function to get a single blog post

export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.query;
    // Define the query object
    let query: any = {
      contentType: "normal",
    };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    // Fetch all blog posts from the database based on the query
    const blogPosts = await BlogPost.find(query).sort({ publicationDate: -1 });

    // Return the fetched blog posts
    res.status(200).json(blogPosts);
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching blog posts:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

//getblod by id
export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const blog = await BlogPost.findById(postId);
    if (!blog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

// Controller function to edit a new blog post
export const editBlogPostHandler = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    let status;
    const { title, content, publicationDate } = req.body;
    const existingBlogPost = await BlogPost.findById(postId);
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }
    // Check if the blog post exists
    if (!existingBlogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Blog post not found" });
    }
    // Check if the user is authorized to edit the blog post
    if (existingBlogPost.author !== user.username) {
      return res.status(403).json({
        status: "Failed",
        message: "You are not authorized to edit this newsletter",
      });
    }
    if (publicationDate >= new Date()) {
      status = "draft";
    }

    // Update the blog post with the new data
    existingBlogPost.status = status || existingBlogPost.status;
    existingBlogPost.title = title;
    existingBlogPost.content = content;
    existingBlogPost.publicationDate =
      publicationDate || existingBlogPost.publicationDate;
    existingBlogPost.updatedAt = new Date();

    // Save the updated blog post
    await existingBlogPost.save();

    // Return the updated blog post
    res.status(200).json(existingBlogPost);
  } catch (error) {
    console.error("Error editing blog post:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
// Controller function to delete a blog post
export const deleteBlogPostHandler = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    // Find the blog post by postId
    const existingBlogPost = await BlogPost.findById(postId);
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }
    // Check if the blog post exists
    if (!existingBlogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Blog post not found" });
    }
    // Check if the user is authorized to edit the blog post
    if (existingBlogPost.author !== user.username) {
      return res.status(403).json({
        status: "Failed",
        message: "You are not authorized to edit this newsletter",
      });
    }
    // Delete the blog post
    await existingBlogPost.deleteOne();

    res
      .status(200)
      .json({ status: "Sucess", message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
