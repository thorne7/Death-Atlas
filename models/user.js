const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Virtual to get the friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
