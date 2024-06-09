import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();


// Route for Get All Books from database
// router.get('/', async (request, response) => {
//   try {
//     const employees = await Employee.find({});

//     return response.status(200).json({
//       count: employees.length,
//       data: employees,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });
router.get('/id/:emp_name', async (req, res) => {
  try {
    const employee = await Employee.findOne({ emp_name: req.params.emp_name });
    if (employee) {
      res.json({ emp_id: employee.emp_id });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;