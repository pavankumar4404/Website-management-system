// emailMasterModel.js
import mongoose from "mongoose";

const emailDetailSchema = mongoose.Schema(
  {
    email_id: {
      type: String,
      default: null,
      required: true,
    },
    email_detail: {
      type: String,
      default: null,
      required: true,
    },
  },
);

const emailSchema = mongoose.Schema(
  {
    emp_id: {
      type: Number,
      default: null,
      required: true,
    },
    email_type: {
      type: Number,
      default: 80,
      required: true,
    },
    emailDetail: [emailDetailSchema],
  },
  {
    timestamps: true,
  }
);

export const Email = mongoose.model("Email", emailSchema);
