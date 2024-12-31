import "dotenv/config";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Function to send email
 * @param {string | string[]} email - Recipient's email address(es)
 * @param {string} subject - Email subject
 * @param {string} text - Email body as plain text
 */
export const sendEmail = async (
  email: string | string[],
  subject: string,
  text: string
) => {
  try {
    // Check if email is empty or undefined
    if (!email || (Array.isArray(email) && email.length === 0)) {
      console.error("No recipients defined");
      throw new Error("No recipients defined");
    }

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
