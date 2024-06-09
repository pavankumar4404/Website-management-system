import mongoose from "mongoose";

const stateSchema = mongoose.Schema(
  {
    state_code: {
      type: Number,
      required: true,
    },
    state_name: {
      type: String,
      required: true,
    },
    state_name_local: {
      type: String,
      required: true,
    },
    state_UT: {
      type: String,
      required: true,
      enum: ['S', 'U'], // Enum to restrict the value to either 'S' or 'U'
    },
  },
  {
    timestamps: true,
  }
);

export const State = mongoose.model('State', stateSchema);
