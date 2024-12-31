import { z } from "zod";

export const HistoryItemSchema = z.array(z.object({
  title: z.string(),
  content: z.any(),
})).nonempty();

export const ValuesSchema = z.array(z.string()).nonempty();

export const MissionSchema = z.array(z.string()).nonempty();

export const VisionSchema = z.array(z.string()).nonempty();

export const AchievementSchema = z.array(z.object({
  title: z.string(),
  content: z.any(),
  date: z.date(),
})).nonempty();

export const AboutUsSchema = z.object({
  history:HistoryItemSchema,
  vision: VisionSchema,
  mission: MissionSchema,
  values: ValuesSchema,
  achievements: AchievementSchema,
});
