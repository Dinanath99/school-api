import mongoose from "mongoose";
import { EVENT_CATEGORIES_ENUM, EVENT_VISIBILE_TO } from "../utils/constants";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    time: {
      type: String,
      required: [true, "time is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    description: {
      type: String,
      required: [true, "location is required"],
    },
    category: {
      type: [{ type: String, enum: EVENT_CATEGORIES_ENUM }],
      default: ["academic"],
    },
    eventVisibility: {
      type: [{ type: String, enum: EVENT_VISIBILE_TO }],
      default: ["public"],
    },
    additionalInfo: {
      type: [
        {
          title: String,
          content: mongoose.Schema.Types.Mixed,
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event = mongoose.model("Event", eventSchema);

export { Event };
