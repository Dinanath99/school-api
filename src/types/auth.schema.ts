
import { z } from "zod";
import { imageRefinement } from "../utils/image.validator";
import { HOUSE_ENUM, USER_ROLE_ENUM } from "../utils/constants";

export const signUpSchema = z
  .object({
    username: z.string({ required_error: "username is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(
            value
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
        }
      ),
    confirmPassword: z.string().min(8).max(16),
    image: imageRefinement.optional(),
    house: z.string().refine((value) => HOUSE_ENUM.includes(value), {
      message: "Invalid house type. Must be one of: " + HOUSE_ENUM.join(", "),
    }),
    role: z
      .array(z.enum(USER_ROLE_ENUM))
      .default(["normal-user"])
      .refine((roles) => roles.length > 0, {
        message: "Role must contain at least one item",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Password and confirm password must match",
  });
