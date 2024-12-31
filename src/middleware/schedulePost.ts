import e from "express";
import { BlogPost } from "../models/blog.model";

const cron = require("node-cron");

// Schedule a task to change the status of posts to "published" after the publication date
function schedulePost() {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running publication task...");
      const currentDate = new Date();
      const publishedPosts = await BlogPost.find({
        status: "draft", // Assuming posts with status 'draft' are to be published
        publicationDate: { $lte: currentDate }, // Find posts with publication date less than or equal to current date
      });

      for (const post of publishedPosts) {
        post.status = "published";
        await post.save();
      }
    } catch (error) {
      console.error("Error scheduling publication:", error);
    }
  });
}

// Schedule a task to change the status of posts to "archived" after one month
function scheduleArchival() {
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running archival task...");
    const currentDate = new Date();
    const oneMonthAgo = new Date(
      currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
    ); // Calculate one month ago

    const archivedPosts = await BlogPost.find({
      status: "published", // Assuming only published posts are to be archived
      contentType: "newsletter", // Assuming newsletters are the posts to be archived
      publicationDate: { $lte: oneMonthAgo }, // Find posts published more than one month ago
    });

    for (const post of archivedPosts) {
      post.status = "archived";
      await post.save();
    }
  } catch (error) {
    console.error("Error scheduling archival:", error);
  }
});
}
export { schedulePost, scheduleArchival };
