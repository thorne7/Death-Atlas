const mongoose = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: (timestamp) => new Date(timestamp).toISOString() },
  username: { type: String, required: true },
  reactions: [reactionSchema], // Use the reactionSchema defined later
});

// Virtual to get the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
