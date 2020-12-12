// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const database = require('../connection');
const Comments = require('./Comments');

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: String, required: true }, // should be ObjectId later
  createdAt: { type: Date, required: true },
  comments: [Comments.CommentSchema],
  // likes eventually
});

const Post = mongoose.model('Post', PostSchema);

function getAllPosts() {
  return Post.find();
}

function createPost(post) {
  const newPost = new Post({
    text: post.text,
    createdBy: post.createdBy,
    createdAt: new Date(),
    comments: [],
  });
  return newPost.save().then(() => {
    // socket emitter here
  });
}

module.exports = {
  getAllPosts,
  createPost,
};
