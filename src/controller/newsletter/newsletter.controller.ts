import { Request, Response } from "express";
import { BlogPost } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { sendEmail } from "../../services/sendEmail";
export const getEmails = async (house: string): Promise<string[]> => {
  try {
    const admins = await User.find({ house: house });
    const Emails = admins.map((admin) => admin.email);
    if (Emails.length === 0) {
      console.warn(`No emails found for house: ${house}`);
    }
    return Emails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw new Error("Failed to fetch admin emails");
  }
};
export const createNewsLetterHandler = async (req: Request, res: Response) => {
  try {
    //let status = "draft";
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
    const {
      title,
      content,
      updates,
      announcements,
      achievements,
      upcomingEvents,
      house,
      publicationDate,
      description,
    } = req.body;
    // if (new Date(publicationDate) >= new Date()) {
    //   status = "draft";
    // }
    let status = "draft";
    // Check if publication date is provided and valid
    if (publicationDate && new Date(publicationDate) <= new Date()) {
      status = "published";
    }
    console.log(publicationDate);
    const newBlogPost = await BlogPost.create({
      status,
      title,
      author: username,
      contentType: "newsletter",
      house,
      description,
      content: {
        content,
        updates,
        announcements,
        achievements,
        upcomingEvents,
        house,
      },
      publicationDate: publicationDate ? new Date(publicationDate) : new Date(),
    });
    const emails = await getEmails(house);
    if (emails.length > 0) {
      await sendEmail(
        emails,
        `New Newsletter: ${title}`,
        `A new newsletter has been created by ${username} for ${house} house`
      );
    } else {
      console.warn(`No recipients to send email for house: ${house}`);
    }
    res.status(201).json(newBlogPost); // Return the newly created blog post
  } catch (error) {
    console.error("Error creating newsletter:", error);
    console.log(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

// Handler to edit a newsletter post
export const editNewsLetterHandler = async (req: Request, res: Response) => {
  try {
    let status;
    const postId = req.params.id;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }
    const existingBlogPost = await BlogPost.findById(postId);
    // Check if the blog post exists
    if (!existingBlogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Newsletter post not found" });
    }
    // Check if the user is authorized to edit the blog post
    if (existingBlogPost.author !== user.username) {
      return res.status(403).json({
        status: "Failed",
        message: "You are not authorized to edit this newsletter",
      });
    }
    // Extract username from the user object
    const username = user.username;
    const {
      title,
      content,
      updates,
      announcements,
      achievements,
      upcomingEvents,
      publicationDate,
      house,
    } = req.body;
    if (publicationDate >= new Date()) {
      status = "draft";
    }
    // Find the existing blog post by ID and update it
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      postId,
      {
        status,
        title,
        author: username,
        contentType: "newsletter",
        house,
        content: {
          content,
          updates,
          announcements,
          achievements,
          upcomingEvents,
        },
        publicationDate,
      },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedBlogPost); // Return the updated blog post
  } catch (error) {
    console.error("Error editing newsletter:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

// Handler to delete a newsletter post
export const deleteNewsLetterHandler = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }
    const existingBlogPost = await BlogPost.findById(postId);
    // Check if the blog post exists
    if (!existingBlogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Newsletter post not found" });
    }
    // Check if the user is authorized to edit the blog post
    if (existingBlogPost.author !== user.username) {
      return res.status(403).json({
        status: "Failed",
        message: "You are not authorized to edit this newsletter",
      });
    }
    // Find the blog post by ID and delete it
    const deletedBlogPost = await BlogPost.findByIdAndDelete(postId);

    // Check if the post was found and deleted
    if (!deletedBlogPost) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Newsletter post not found" });
    }

    res.status(200).json({
      status: "Success",
      message: "Newsletter post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

// export const getNewsletter = async (req: Request, res: Response) => {
//   try {
//     const { house, publicationDate, author } = req.query;
//     console.log("Received query params:", { house, publicationDate, author });

//     let query: any = {
//       status: "published",
//       contentType: "newsletter",
//     };

//     // If house is provided, add it to the query
//     if (house) {
//       query["house"] = house; // Assuming house is a top-level field, not nested in content
//     }
//     if (author) {
//       query["author"] = author;
//     }

//     // If publicationDate is provided, add a range to the query
//     if (publicationDate) {
//       const date = new Date(publicationDate as string);
//       const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
//       const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

//       query["publicationDate"] = {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       };
//     }

//     console.log("Constructed query:", JSON.stringify(query, null, 2));

//     const newsletterPosts = await BlogPost.find(query).sort({
//       publicationDate: -1,
//     });

//     console.log("Newsletter posts found:", newsletterPosts);
//     res.status(200).json({ data: newsletterPosts });
//   } catch (error) {
//     console.error("Error fetching newsletter posts:", error);
//     res
//       .status(500)
//       .json({ status: "Failed", message: "Internal server error" });
//   }
// };
export const getNewsletter = async (req: Request, res: Response) => {
  try {
    const { house, publicationDate, author } = req.query;
    console.log("Received query params:", { house, publicationDate, author });

    let query: any = {
      status: "published",
      contentType: "newsletter",
    };

    // If house is provided, add it to the query
    if (house) {
      query["house"] = house as string; // Assuming house is a top-level field, not nested in content
    }
    if (author) {
      query["author"] = author as string;
    }

    // If publicationDate is provided, add a range to the query
    if (publicationDate) {
      const date = new Date(publicationDate as string);
      const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

      query["publicationDate"] = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    console.log("Constructed query:", JSON.stringify(query, null, 2));

    const newsletterPosts = await BlogPost.find(query).sort({
      publicationDate: -1,
    });

    console.log("Newsletter posts found:", newsletterPosts);
    res.status(200).json({ data: newsletterPosts }); // Send JSON response to client
  } catch (error) {
    console.error("Error fetching newsletter posts:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
export const getarchiveNewsletter = async (req: Request, res: Response) => {
  try {
    let query: any = {
      status: "archived",
      contentType: "newsletter",
    };
    const newsletterPosts = await BlogPost.find(query).sort({
      publicationDate: -1,
    });

    res.status(200).json(newsletterPosts);
  } catch (error) {
    console.error("Error fetching newsletter posts:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
