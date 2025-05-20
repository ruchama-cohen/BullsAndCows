import express from 'express';
import {
  addPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getLeaderboard
} from './player.service';

const router = express.Router();

router.get('/:playerid', async (req, res) => {
  const player = await getPlayerById(req.params.playerid);
  if (!player) return res.status(404).json({ error: 'player not found' });
  res.json(player);
});

router.get("/", (req, res) => {
  res.send("Players route working");
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
  const games = await Game.find({ playerId: req.params.playerid })
    .sort({ createdAt: -1 })
    .limit(5);
  res.json(games);
});

router.get('/leaderboard', async (req, res) => {
  const winners = await getLeaderboard();
  res.json(winners);
});




export default router;