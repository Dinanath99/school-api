import { Schema, model, Document, Mixed } from "mongoose";
import { HOUSE_ENUM, POST_CONTENT_TYPE_ENUM, POST_STATUS_ENUM } from "../utils/constants";

// Define the interface for the BlogPost document
interface IBlogPost extends Document {
  status: string;
  title: string;
  author: string;
  contentType: string;
  content: Mixed;
  images: string[];
  publicationDate?: Date;
  house: string;
  description:string
  comments: [
    {
      author: string;
      content: string;
      createdAt: Date;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the BlogPost document
const blogPostSchema = new Schema<IBlogPost>({
  status: {
    type: String,
    enum: POST_STATUS_ENUM,
    default: "published",
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    enum: POST_CONTENT_TYPE_ENUM, // Specify allowed content types
    required: true,
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  publicationDate: {
    type: Date,
    default: undefined,
    set: (value: string | Date) => (value ? new Date(value) : undefined),
  },
  house: {
    type: String,
    required: true,
    enum:HOUSE_ENUM,
  },
  comments: [
    {
      author: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  description:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the BlogPost model
export const BlogPost = model<IBlogPost>("BlogPost", blogPostSchema);
