import mongoose from "mongoose";
import validator from "validator";
import { USER_ROLE_ENUM, HOUSE_ENUM } from "../utils/constants";

interface UserProps extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  eventSubscriptions: boolean;
  role?: string[];
  house: string;
}

const userSchema = new mongoose.Schema<UserProps>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: [validator.isEmail, "Provided email is not valid"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: {
      type: String,
    },
    eventSubscriptions: {
      type: Boolean,
      default: false,
    },
    role: {
      type: [{ type: String, enum: USER_ROLE_ENUM }],
      default: ["normal-user"],
    },
    house: {
      type: String,
      enum: HOUSE_ENUM,
      required: [true, "house is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model<UserProps>("User", userSchema);

export { User };
export default User; // Ensure default export
