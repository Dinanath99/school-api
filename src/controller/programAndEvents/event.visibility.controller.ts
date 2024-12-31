import { NextFunction, Request, Response } from "express";
import { Event } from "../../models/events.model";
import { eventVisibleSchema } from "../../types/event.schema";

export const setEventsVisibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = req.params.id;
    const { eventVisibility } = req.body;
    const validatedData = eventVisibleSchema.parse(eventVisibility);

    const event = await Event.findByIdAndUpdate(
      { _id: eventId },
      { $set: { eventVisibility: validatedData } },
      { new: true }
    );

    return res
      .status(203)
      .send({ status: true, message: "event visibility set" });
  } catch (error: any) {
    next(error);
  }
};
