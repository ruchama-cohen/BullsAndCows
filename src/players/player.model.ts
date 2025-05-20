import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  password: String,
  mail: String,
  totalGames: Number,
  wins: Number,
});

export const Player = mongoose.model('Player', playerSchema);
