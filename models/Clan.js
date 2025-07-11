// models/Clan.js
import mongoose from "mongoose";

const ClanSchema = new mongoose.Schema({
  clanName: { type: String, required: true },
  leaderName: { type: String, required: true },
  slogan: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Clan", ClanSchema);
