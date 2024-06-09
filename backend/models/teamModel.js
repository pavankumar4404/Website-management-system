import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    team_members: [
      {
        type: String,
        required: true,
      }
    ],
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model("Team", teamSchema);