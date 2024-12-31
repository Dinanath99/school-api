import { User } from "../../models/user.model";
import { sendEmail } from "../../services/sendEmail";
import { EventProps } from "../../types/event.schema";

export const getEventSubscribedEmails = async () => {
  try {
    const subscribers = await User.find({ eventSubscriptions: true });

    const subscriberEmails = subscribers.map((subscriber) => subscriber.email);
    return subscriberEmails;
  } catch (error) {
    console.error("Error fetching subscriber emails:", error);
    throw new Error("Failed to fetch subscriber emails");
  }
};
// Controller function to submit contact form
export const sendEventEmails = async (eventDetails: EventProps) => {
  try {
    const {
      title,
      date,
      time,
      category,
      description,
      location,
      additionalInfo,
    } = eventDetails;
    const subscriberEmails = await getEventSubscribedEmails();

    const mailBody = `Dear Uer,\n\nYou are invited to attend the following event:\n\nTitle: ${title}\nDate: ${date}\nTime: ${time}\nCategory: ${category}\nDescription: ${description}\nLocation: ${location}\nAdditional Info: ${additionalInfo}\n\nWe hope to see you there!\n\nBest regards,\nXYZ school`;

    await sendEmail(
      subscriberEmails,
      `New Contact Form Submission: ${mailBody}`,
      mailBody,

    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw new Error("Failed to send emails");
  }
};
