const express = require('express');
const router = express.Router();
const Thought = require('../models/thought');
const User = require('../models/user');


// GET to get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET to get a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to create a new thought
router.post('/thoughts', async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    const thought = new Thought({ thoughtText, username });
    const user = await User.findOne({ username });
    user.thoughts.push(thought);
    await Promise.all([thought.save(), user.save()]);
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT to update a thought by its _id
router.put('/thoughts/:thoughtId', async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE to remove a thought by its _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findByIdAndDelete(thoughtId);
    if (thought) {
      await User.findByIdAndUpdate(thought.username, { $pull: { thoughts: thoughtId } });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
