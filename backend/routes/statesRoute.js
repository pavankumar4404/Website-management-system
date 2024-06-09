import express from 'express';
import { State } from '../models/stateModel.js';

const router = express.Router();


// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const states = await State.find({});

    return response.status(200).json({
      count: states.length,
      data: states,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;