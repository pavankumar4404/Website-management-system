import express from 'express';
import { Employee } from '../models/employeeMasterModel.js';

const router = express.Router();

// Route for creating a new employee
router.post('/', async (req, res) => {
  try {
    const {
      emp_id,
      emp_name,
      gender_id,
      designation_id,
      personal_email_id,
      office_emp_code,
      mobile_no,
      posting_location_id,
      ip_phone,
      emergency_contact_no,
      state_code,
      district_code,
      emp_type,
      emp_work_status,
    } = req.body;

    if (!emp_id || !emp_name || !gender_id || !designation_id || !personal_email_id ||
        !office_emp_code || !mobile_no || !posting_location_id || !ip_phone ||
        !emergency_contact_no || !state_code || !district_code || !emp_type) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const newEmployee = new Employee({
      emp_id,
      emp_name,
      gender_id,
      designation_id,
      personal_email_id,
      office_emp_code,
      mobile_no,
      posting_location_id,
      ip_phone,
      emergency_contact_no,
      state_code,
      district_code,
      emp_type,
      emp_work_status,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({ message: "Record not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating an employee
router.put('/:id', async (req, res) => {
  try {
    const {
      emp_id,
      emp_name,
      gender_id,
      designation_id,
      personal_email_id,
      office_emp_code,
      mobile_no,
      posting_location_id,
      ip_phone,
      emergency_contact_no,
      state_code,
      district_code,
      emp_type,
      emp_work_status,
    } = req.body;

    if (!emp_id || !emp_name || !gender_id || !designation_id || !personal_email_id ||
        !office_emp_code || !mobile_no || !posting_location_id || !ip_phone ||
        !emergency_contact_no || !state_code || !district_code || !emp_type) {
      return res.status(400).send({ message: "Send all required fields" });
    }

    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      emp_id,
      emp_name,
      gender_id,
      designation_id,
      personal_email_id,
      office_emp_code,
      mobile_no,
      posting_location_id,
      ip_phone,
      emergency_contact_no,
      state_code,
      district_code,
      emp_type,
      emp_work_status,
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting an employee
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
