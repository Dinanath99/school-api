import mongoose from "mongoose";

// interface HistoryProps {}

// interface MissionProps {}

// interface AchievementProps {}
// export interface AboutUsProps extends mongoose.Document {}

const aboutUsSchema = new mongoose.Schema(
  {
    history: {
      type: [
        {
          title: String,
          content: mongoose.Schema.Types.Mixed,
        },
      ],
    },
    vision: { type: [String], required: true },
    mission: { type: [String], required: true },
    values: { type: [String], required: true },
    achievements: {
      type: [
        {
          title: String,
          content: mongoose.Schema.Types.Mixed,
          date: Date,
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true },
  }
);

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

export { AboutUs };
