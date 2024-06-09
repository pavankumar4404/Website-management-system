import express from "express";
import { Team } from "../models/teamMemberModel.js";

const router = express.Router();

// Route for Save a new team
router.post("/", async (request, response) => {
  try {
    const { team_name, team_members } = request.body;

    if (!team_name || !Array.isArray(team_members) || team_members.length === 0) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const newTeam = new Team({
      team_name,
      team_members,
    });

    const team = await newTeam.save();

    return response.status(201).send(team);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All teams from database
router.get("/", async (request, response) => {
  try {
    const teams = await Team.find({});

    return response.status(200).json({
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One team from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const team = await Team.findById(id);

    if (!team) {
      return response.status(404).send({ message: "Record not found" });
    }

    return response.status(200).json(team);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a team
router.put("/:id", async (request, response) => {
  try {
    const { team_name, team_members } = request.body;

    if (!team_name || !Array.isArray(team_members) || team_members.length === 0) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;

    const result = await Team.findByIdAndUpdate(id, {
      team_name,
      team_members,
    }, { new: true });

    if (!result) {
      return response.status(404).json({ message: "Record not found" });
    }

    return response.status(200).send({ message: "Record updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an entire team document
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Team.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Team not found" });
    }

    return response.status(200).send({ message: "Team deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a specific team member
router.delete('/:teamId/members/:memberId', async (req, res) => {
  try {
    const { teamId, memberId } = req.params;

    const teamRecord = await Team.findById(teamId);
    if (!teamRecord) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // const memberIndex = teamRecord.team_members.indexOf(memberName);
    if (memberId === -1) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Remove the team member
    teamRecord.team_members.splice(memberId, 1);

    // If the team_members array is empty, delete the entire record
    if (teamRecord.team_members.length === 0) {
      await Team.findByIdAndDelete(teamId);
      return res.status(200).json({ message: 'Team record deleted successfully' });
    }

    // Otherwise, save the updated record
    await teamRecord.save();

    return res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
