const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
// const database = require('../connection');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: ObjectId, required: true },
  // comments: [ObjectId],
  likes: [ObjectId],
});

module.exports = {
  CommentSchema,
};
