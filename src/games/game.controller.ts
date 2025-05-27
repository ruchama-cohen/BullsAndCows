import { Router } from 'express';
import { startGame, getGameStatus, endGame } from './game.service';
import { validateParameters } from '../middleware/validateGame';
import * as gameService from './game.service';

const router = Router();

router.get("/", (req, res) => {
  res.send("Games route working");
});

router.get('/:gameId', async (req, res) => {
  try {
    const game = await getGameStatus(req.params.gameId);
    res.json(game);
  } catch (error) {
    const err = error as Error;
    console.error('Error getting game status:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post('/start', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request body type:', typeof req.body);
    
    const game = await startGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    const err = error as Error;
    console.error('Error starting game:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post('/:gameId/guess', validateParameters, async (req, res) => {
  try {
    const result = await gameService.guess(req.params.gameId, req.body.guess);
    res.json(result);
  } catch (error) {
    const err = error as Error;
    console.error('Error making guess:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post('/:gameId/end', async (req, res) => {
  try {
    const result = await endGame(req.params.gameId);
    res.json(result);
  } catch (error) {
    const err = error as Error;
    console.error('Error ending game:', err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;