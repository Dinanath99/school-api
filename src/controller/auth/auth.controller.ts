import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user.model";
import { signUpSchema } from "../../types/auth.schema";
import { hashPassword, verifyPassword } from "../../utils/password";
import createSecretToken from "../../utils/secretToken";

// export const signUp = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const validatedData = signUpSchema.parse(req.body);

//     const { email, password, username, image, house, role } = validatedData;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(409)
//         .send({ status: false, message: "user already exists" });
//     }

//     const hashedPassword = await hashPassword(password);

//     const user = await User.create({
//       username: username,
//       email,
//       password: hashedPassword,
//       image: image,
//       house,
//       role,
//     });

//     await user.save();

//     res
//       .status(203)
//       .send({ success: true, message: "user signed up successfully" });
//   } catch (error: any) {
//     next(error);
//   }
// };

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = signUpSchema.parse(req.body);

    const { email, password, username, image, house, role } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ status: false, message: "user already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      image,
      house,
      role,
    });

    await user.save();

    res.status(203).send({
      success: true,
      message: "user signed up successfully",
      data:user
    });
  } catch (error: any) {
    next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(403)
        .send({ status: false, message: "all fields are mandatory" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(403)
        .send({ status: false, message: "user doesn't exist" });
    }

    const isPasswordMatched = await verifyPassword(
      password,
      existingUser.password as string
    );

    if (!isPasswordMatched) {
      return res
        .status(403)
        .send({ status: false, message: "invalid credentials" });
    }

    // Provide a default value for role if it is undefined
    const token = createSecretToken(
      existingUser._id as string,
      existingUser.role ?? ["normal-user"]
    );

    const user = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    res.status(200).send({
      status: true,
      message: "user logged in successfully",
      user,
      token,
    });
  } catch (error: any) {
    next(error);
  }
};

export const logOut = async (req: Request, res: Response) => {};
