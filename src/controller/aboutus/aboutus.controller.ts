import { NextFunction, Request, Response } from "express";
import { AboutUs } from "../../models/aboutus.model";
import {
  AboutUsSchema,
  AchievementSchema,
  HistoryItemSchema,
  MissionSchema,
  ValuesSchema,
  VisionSchema,
} from "../../types/aboutus.schema";

export const getAboutUsDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const aboutUsDetails = await AboutUs.find();
    if (aboutUsDetails.length <= 0) {
      return res
        .status(404)
        .send({
          success: false,
          message: "no about us details found",
          details: [],
        });
    }
    return res
      .status(200)
      .send({
        success: true,
        message: "about us details found",
        details: aboutUsDetails,
      });
  } catch (error: any) {
    next(error);
  }
};
export const addAboutUsDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedData = req.body.achievements.map((item: any) => {
      return {
        title: item.title,
        content: item.content,
        date: new Date(item.date),
      };
    });
    const validatedData = AboutUsSchema.parse({
      ...req.body,
      achievements: updatedData,
    });
    const { mission, history, values, vision, achievements } = validatedData;
    const aboutUsDetails = new AboutUs({
      history: history,
      vision: vision,
      mission: mission,
      values: values,
      achievements: achievements,
    });
    await aboutUsDetails.save();
    res
      .status(203)
      .send({ status: true, message: "about us added successfully" });
  } catch (error: any) {
    next(error);
  }
};

export const updateAboutUsDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>  {
  try {
    const aboutUsId = req.params.id;

    const fieldToUpdate = req.query.field;

    switch (fieldToUpdate) {
      case "history":
        const validatedData = HistoryItemSchema.parse(req.body.history);
        await AboutUs.findByIdAndUpdate(aboutUsId, { history: validatedData });
        break;
      case "vision":
        const validatedVisionData = VisionSchema.parse(req.body.vision);
        await AboutUs.findByIdAndUpdate(aboutUsId, {
          vision: validatedVisionData,
        });
        break;
      case "mission":
        const validatedMissionData = MissionSchema.parse(req.body.mission);
        await AboutUs.findByIdAndUpdate(aboutUsId, {
          mission: validatedMissionData,
        });
        break;
      case "values":
        const validatedValuesData = ValuesSchema.parse(req.body.values);
        await AboutUs.findByIdAndUpdate(aboutUsId, {
          values: validatedValuesData,
        });
        break;
      case "achievements":
        const updatedData = req.body.achievements.map((item: any) => {
          return {
            title: item.title,
            content: item.content,
            date: new Date(item.date),
          };
        });
        const validatedAchievementData = AchievementSchema.parse(
         updatedData
        );
        await AboutUs.findByIdAndUpdate(aboutUsId, {
          achievements: validatedAchievementData,
        });
        break;
      default:
        return res
          .status(400)
          .send({ success: false, message: "Invalid field parameter" });
    }

    res
      .status(200)
      .send({ success: true, message: `${fieldToUpdate} updated successfully` });
  } catch (error: any) {
    next(error);
  }
};

export const deleteAboutUsDetails = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const aboutUsId = req.params.id;

    const fieldToDelete = req.query.field;

    switch (fieldToDelete) {
      case "all":
        await AboutUs.findByIdAndDelete(aboutUsId);
        break;
      default:
        return res
          .status(400)
          .send({ success: false, message: "Invalid field parameter" });
    }

    res
      .status(200)
      .send({ status: true, message: `${fieldToDelete} deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};

