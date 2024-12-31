import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user.model";

export const subscribeEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(
      { _id: userId },
      { eventSubscriptions: true },
      { new: true, runValidators: true }
    );

    return res.status(200).send({ success: true, message: "event subscribed" });
  } catch (error: any) {
    next(error);
  }
};

export const unSubscribeEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(
      { _id: userId },
      { eventSubscriptions: false },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .send({ success: true, message: "event unsubscribed" });
  } catch (error: any) {
    next(error);
  }
};
