import express from "express";
import { startGame, guess, getGameStatus, endGame } from './game.service';

const router = express.Router();


router.get("/", (req, res) => {
  res.send("Games route working");
});

router.get('/:gameId', async (req, res) => {
  const game = await getGameStatus(req.params.gameId);
  res.json(game);
});

router.post('/start', async (req, res) => {
  const game = await startGame(req.body);
  res.status(201).json(game);
});

router.post('/:gameId/guess', async (req, res) => {
  const result = await guess(req.params.gameId, req.body);
  res.json(result);
});

router.post('/:gameId/end', async (req, res) => {
  const result = await endGame(req.params.gameId);
  res.json(result);
});

export default router;
