// routes/index.js
import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Page d'accueil
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("index", { posts });
});

export default router;
