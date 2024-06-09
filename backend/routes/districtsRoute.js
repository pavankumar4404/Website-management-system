import express from 'express';
import { District } from '../models/districtModel.js';

const router = express.Router();


// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const districts = await District.find({});

    return response.status(200).json({
      count: districts.length,
      data: districts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
// router.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const district = await District.findById(id);

//     return response.status(200).json(district);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });



export default router;
