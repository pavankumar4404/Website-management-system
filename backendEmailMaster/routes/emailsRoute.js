import express from "express";
import { Email } from "../models/emailMasterModel.js";

const router = express.Router();

// Route for Save a new email
router.post("/", async (request, response) => {
  try {
    const { emp_id, email_type, emailDetail } = request.body;

    if (!emp_id || !emailDetail || !Array.isArray(emailDetail) || emailDetail.length === 0) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    emailDetail.forEach(email => {
      if (!email.email_id || !email.email_detail) {
        return response.status(400).send({
          message: "Each email must have an email_id and email_detail",
        });
      }
    });

    const newEmail = new Email({
      emp_id,
      email_type,
      emailDetail,
    });

    const email = await newEmail.save();

    return response.status(201).send(email);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All emailDetail from database
router.get("/", async (request, response) => {
  try {
    const emailDetail = await Email.find({});

    return response.status(200).json({
      count: emailDetail.length,
      data: emailDetail,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One email from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const email = await Email.findById(id);

    if (!email) {
      return response.status(404).send({ message: "Record not found" });
    }

    return response.status(200).json(email);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a email
router.put("/:id", async (request, response) => {
  try {
    const { emp_id, email_type, emailDetail } = request.body;

    if (!emp_id || !emailDetail || !Array.isArray(emailDetail) || emailDetail.length === 0) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    emailDetail.forEach(email => {
      if (!email.email_id || !email.email_detail) {
        return response.status(400).send({
          message: "Each email must have an email_id and email_detail",
        });
      }
    });

    const { id } = request.params;

    const result = await Email.findByIdAndUpdate(id, {
      emp_id,
      email_type,
      emailDetail,
    });

    if (!result) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an entire email document
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Email.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Email not found" });
    }

    return response.status(200).send({ message: "Email deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a specific email detail
router.delete('/:id/emailDetail/:emailDetailId', async (req, res) => {
  try {
    const { id, emailDetailId } = req.params;

    const emailRecord = await Email.findById(id);
    if (!emailRecord) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const emailDetailIndex = emailRecord.emailDetail.findIndex(detail => detail._id.toString() === emailDetailId);
    if (emailDetailIndex === -1) {
      return res.status(404).json({ message: 'Email detail not found' });
    }

    // Remove the email detail
    emailRecord.emailDetail.splice(emailDetailIndex, 1);

    // If the emailDetail array is empty, delete the entire record
    if (emailRecord.emailDetail.length === 0) {
      await Email.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Email record deleted successfully' });
    }

    // Otherwise, save the updated record
    await emailRecord.save();

    return res.status(200).json({ message: 'Email detail deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
