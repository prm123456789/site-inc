// routes/post.js
import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";

const router = express.Router();

// Configurer multer pour l'upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Formulaire d'upload
router.get("/upload", (req, res) => {
  res.render("upload");
});

// Publier un post
router.post("/upload", upload.single("image"), async (req, res) => {
  const { clanName, text } = req.body;
  const image = req.file ? req.file.filename : null;
  const post = new Post({ clanName, text, image });
  await post.save();
  res.redirect("/");
});

// Like
router.post("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes("anonymous")) {
    post.likes.push("anonymous");
  }
  await post.save();
  res.json({ likes: post.likes.length });
});

// Ajouter un commentaire
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ text: req.body.comment, author: "anonymous" });
  await post.save();
  res.redirect("/");
});

// Supprimer post
router.delete("/delete/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

// Supprimer commentaire
router.delete("/:postId/comment/:commentId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.comments = post.comments.filter(c => c._id.toString() !== req.params.commentId);
  await post.save();
  res.sendStatus(200);
});

export default router;
