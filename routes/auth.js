// routes/auth.js
import express from "express";
import Clan from "../models/Clan.js";

const router = express.Router();

// Formulaire d'inscription
router.get("/register", (req, res) => {
  res.render("register");
});

// Inscription clan
router.post("/register", async (req, res) => {
  const { clanName, leaderName, slogan } = req.body;
  const clan = new Clan({ clanName, leaderName, slogan });
  await clan.save();
  res.redirect("/");
});

export default router;
