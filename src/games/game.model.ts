import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  guess: [Number],
  bulls: Number,
  pgias: Number,
  createdAt: { type: Date, default: Date.now }
});

const gameSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  secretCode: [Number],
  attempts: [attemptSchema],
  status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], default: 'in-progress' },
  maxAttempts: Number,
  winner: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export const Game = mongoose.model('Game', gameSchema);
