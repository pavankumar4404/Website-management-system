import express from 'express';
import { Email } from '../models/emailMasterModel.js';

const router = express.Router();


// Route for Get All Books from database
// router.get('/', async (request, response) => {
//   try {
//     const emails = await Email.find({});

//     return response.status(200).json({
//       count: emails.length,
//       data: emails,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

router.get('/emp/:emp_id', async (req, res) => {
  try {
    const emails = await Email.find({ emp_id: req.params.emp_id });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;