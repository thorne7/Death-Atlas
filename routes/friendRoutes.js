const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
    res.json({ message: 'Friend added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
    res.json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
