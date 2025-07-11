// models/Post.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  clanName: String,
  text: String,
  image: String,
  likes: [String],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", PostSchema);
