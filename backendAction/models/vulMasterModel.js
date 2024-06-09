import mongoose from "mongoose";

// Define the inner schema for vulnerability details
const vulDetailSchema = mongoose.Schema(
  {
    vul_id: {
      type: String,
      default: null,
      required: true,
    },
    vul_reported_date: {
      type: Date,
      default: null,
      required: true,
    },
    vul_subject: {
      type: String,
      default: null,
      required: true,
    },
    vul_report: {
      type: String,
      default: null,
      required: true,
    },
    vul_status: {
      type: String,
      enum: ["Opened", "Closed"],
      default: "Opened",
      required: true,
    },
    action: {
      type: String,
      default: null,
    },
    action_status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  }
);

// Define the outer schema for website details
const websiteSchema = mongoose.Schema(
  {
    website_url: {
      type: String,
      default: null,
      required: true,
    },
    website_name: {
      type: String,
      default: null,
      required: true,
    },
    dept: {
      type: String,
      default: null,
      required: true,
    },
    ip_addr: {
      type: String,
      default: null,
    },
    ssl: {
      type: String,
      default: false,
      required: true,
    },
    sec_audit: {
      type: String,
      default: false,
      required: true,
    },
    hod: {
      type: String,
      default: null,
      required: true,
    },
    os: {
      type: String,
      default: null,
      required: true,
    },
    loc: {
      type: String,
      default: null,
      required: true,
    },
    vulDetails: [vulDetailSchema],
  },
  {
    timestamps: true,
  }
);

// Export the Website model
export const Website = mongoose.model("Website", websiteSchema);
