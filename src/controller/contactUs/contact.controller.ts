import { Request, Response } from "express";
import ContactMessage from "../../models/contactUs.model";
import { sendEmail } from "../../services/sendEmail";
import { User } from "../../models/user.model";
export const getAdminEmails = async () => {
  try {
    // Query the database to find users with admin role
    const admins = await User.find({ role: "administrator" });
    // Extract email addresses of admin users
    const adminEmails = admins.map((admin) => admin.email);
    return adminEmails;
  } catch (error) {
    console.error("Error fetching admin emails:", error);
    throw new Error("Failed to fetch admin emails");
  }
};
// Controller function to submit contact form
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const adminEmails = await getAdminEmails();
    // Save the contact message to the database
    await ContactMessage.create({ name, email, subject, message });
    const mailBody = `Name: ${name}\nSubject: ${subject} \nEmail: ${email}\nMessage: ${message}`;
    await sendEmail(
      adminEmails,
      `New Contact Form Submission: ${subject}`,
      mailBody
    );
    res.status(201).json({
      status: "Sucess",
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    console.log(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

// Controller function to retrieve messages for admin panel
export const getMessagesForAdmin = async (req: Request, res: Response) => {
  try {
    // Fetch all contact messages from the database
    const messages = await ContactMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
