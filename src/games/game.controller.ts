import { Router } from 'express';
import { startGame, getGameStatus, endGame } from './game.service';
import { validateParameters } from '../middleware/validateGame';
import * as gameService from './game.service';

const router = Router();

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

router.post('/:gameId/guess', validateParameters, async (req, res) => {
  try {
    const result = await gameService.guess(req.params.gameId, req.body.guess);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:gameId/end', async (req, res) => {
  const result = await endGame(req.params.gameId);
  res.json(result);
});

export default router;
