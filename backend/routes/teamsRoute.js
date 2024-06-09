import express from 'express';
import { Team } from '../models/teamModel.js';

const router = express.Router();


// Route for Get All Books from database
// router.get('/', async (request, response) => {
//   try {
//     const teams = await Team.find({});

//     return response.status(200).json({
//       count: teams.length,
//       data: teams,
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

router.get('/:team_name/members', async (req, res) => {
    try {
      const { team_name } = req.params;
      const team = await Team.findOne({ team_name });
  
      if (team) {
        res.json(team.team_members);
      } else {
        res.status(404).json({ message: 'Team not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
export default router;