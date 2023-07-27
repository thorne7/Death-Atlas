const express = require('express');
const router = express.Router();
const Thought = require('../models/thought');

// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    const reaction = { reactionBody, username };
    await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reaction } }, { new: true });
    res.status(201).json({ message: 'Reaction created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
    res.json({ message: 'Reaction removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove the reaction' });
  }
});
module.exports = router;
