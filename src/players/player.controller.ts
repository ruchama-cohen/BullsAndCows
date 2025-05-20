import express, { Request, Response } from 'express';
import {
  addPlayer,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getLeaderboard,
  getRecentGames
} from './player.service';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Players route working");
});

router.get('/leaderboard', async (req, res) => {
  const winners = await getLeaderboard();
  res.json(winners);
});

router.get('/:playerid', async (req: Request, res: Response) => {
  const player = await getPlayerById(req.params.playerid);
  if (!player) return res.status(404).json({ error: 'player not found' });
  res.json(player);
});

router.put('/:playerid', async (req, res) => {
  const updated = await updatePlayer(req.params.playerid, req.body);
  res.json(updated);
});

router.delete('/:playerid', async (req, res) => {
  await deletePlayer(req.params.playerid);
  res.status(204).end();
});

router.post('/add', async (req, res) => {
  const player = await addPlayer(req.body);
  res.status(201).json(player);
});

router.get('/:playerid/recent', async (req, res) => {
  const games = await getRecentGames(req.params.playerid);
  res.json(games);
});

export default router;