import { NextFunction, Request, Response } from "express";
import { Event } from "../../models/events.model";
import { EventSchema } from "../../types/event.schema";
import { sendEventEmails } from "./event.mail.controller";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventCategory = req.query.category;

    switch (eventCategory) {
      case "all":
        const allEventDetails = await Event.find();
        res.status(200).send({
          success: true,
          message: "event details found",
          details: allEventDetails,
        });
        break;
      case "academic":
        const academicEventDetails = await Event.find({
          category: { $in: ["academic"] },
        });
        res.status(200).send({
          success: true,
          message: "event details found",
          details: academicEventDetails,
        });
        break;
      case "extra-curricular":
        const extraEventDetails = await Event.find({
          category: { $in: ["extra-curricular"] },
        });
        res.status(200).send({
          success: true,
          message: "event details found",
          details: extraEventDetails,
        });
        break;
      case "social":
        const socialEventDetails = await Event.find({
          category: { $in: ["social"] },
        });
        res.status(200).send({
          success: true,
          message: "event details found",
          details: socialEventDetails,
        });
        break;
      default:
        return res
          .status(400)
          .send({ success: false, message: "Invalid field parameter" });
    }
  } catch (error: any) {
    next(error);
  }
};

export const addEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedData = { ...req.body, date: new Date(req.body.date) };

    const validatedData = EventSchema.parse(updatedData);

    const {
      title,
      date,
      time,
      category,
      description,
      location,
      eventVisibility,
      additionalInfo,
    } = validatedData;

    const eventDetails = new Event({
      title: title,
      date: date,
      time: time,
      category: category,
      description: description,
      location: location,
      eventVisibility: eventVisibility,
      additionalInfo: additionalInfo,
    });
    await eventDetails.save();
    await sendEventEmails({
      title,
      date,
      time,
      category,
      description,
      location,
      eventVisibility,
      additionalInfo,
    });
    res.status(203).send({ status: true, message: "event added successfully" });
  } catch (error: any) {
    res.status(400).json({
      succes: false,
      error: error.message,
    });
    console.log(error.message);
    next(error);
  }
};

export const updateEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const doesEventExist = await Event.findOne({ _id: id });
    if (!doesEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "event not found" });
    }
    const updatedData = { ...req.body, date: new Date(req.body.date) };

    const validatedData = EventSchema.parse(updatedData);

    const updatedEvents = await Event.findByIdAndUpdate(
      { _id: id },
      validatedData,
      { new: true, runValidators: true }
    );
    await sendEventEmails(validatedData);
    res.status(203).send({
      status: true,
      message: "event updated successfully",
      details: updatedEvents,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const doesEventExist = await Event.findOne({ _id: id });
    if (!doesEventExist) {
      return res
        .status(404)
        .send({ success: false, message: "event not found" });
    }

    await Event.findByIdAndDelete({ _id: id });
    res.status(203).send({
      success: true,
      message: "event deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};
