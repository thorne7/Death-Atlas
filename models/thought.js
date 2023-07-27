const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Use the reactionSchema defined earlier as a subdocument schema
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;