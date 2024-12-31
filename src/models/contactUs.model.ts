import mongoose, { Schema, Document } from "mongoose";

// Define interface for ContactMessage document
interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Define schema for ContactMessage collection
const ContactMessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define and export ContactMessage model
const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema
);

export default ContactMessage;
