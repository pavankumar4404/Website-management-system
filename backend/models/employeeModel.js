// employeeModel.js
import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    emp_id: {
      type: Number,
      default: null,
      required: true,
    },
    emp_name: {
      type: String,
      default: null,
      maxlength: 50,
      required: true,
    },
    gender_id: {
      type: String,
      default: null,
      required: true,
    },
    designation_id: {
      type: String,
      default: null,
      required: true,
    },
    personal_email_id: {
      type: String,
      default: null,
      maxlength: 100,
      required: true,
    },
    office_emp_code: {
      type: String,
      default: null,
      maxlength: 10,
      required: true,
    },
    mobile_no: {
      type: String,
      default: null,
      maxlength: 11,
      required: true,
    },
    posting_location_id: {
      type: String,
      default: null,
      required: true,
    },
    ip_phone: {
      type: Number,
      default: null,
      required: true,
    },
    emergency_contact_no: {
      type: String,
      default: null,
      maxlength: 11,
      required: true,
    },
    state_code: {
      type: String,
      default: null,
      required: true,
    },
    district_code: {
      type: String,
      default: null,
      required: true,
    },
    emp_type: {
      type: String,
      default: null,
      required: true,
    },
    emp_work_status: {
      type: String,
      default: null,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
