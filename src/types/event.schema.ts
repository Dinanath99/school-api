import { z } from "zod";
import { EVENT_CATEGORIES_ENUM, EVENT_VISIBILE_TO } from "../utils/constants";

export const AdditionalInfoSchema = z
  .array(
    z.object({
      title: z.string(),
      content: z.any(),
    })
  )
  .nonempty();
export const eventVisibleSchema = z.array(z.enum(EVENT_VISIBILE_TO)).nonempty();
export const EventSchema = z.object({
  title: z.string().min(1, "title is required"),
  date: z.date(),
  time: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9] ?([AaPp][Mm])?$/),
  location: z.string().min(1, "location is required"),
  description: z.string().min(1, "description is required"),
  category: z.array(z.enum(EVENT_CATEGORIES_ENUM)).default(["academic"]),
  eventVisibility: eventVisibleSchema,
  additionalInfo: AdditionalInfoSchema.optional(),
  
});

export type EventProps = z.infer<typeof EventSchema>;