import express, { Request, Response, Router } from 'express';
import { validateParameters } from '../middleware/validatePlayer';
import * as playerService from './player.service';

const router = Router();

router.get("/", (req, res) => {
  res.send("Players route working");
});

router.get('/leaderboard', async (req, res) => {
  const winners = await playerService.getLeaderboard();
  res.json(winners);
});

// router.get('/:playerid', async (req, res) => {
//   const player = await playerService.getPlayerById(req.params.playerid);
//   if (!player) return res.status(404).json({ error: 'player not found' });
//   res.json(player);
// });

router.put('/:playerId', validateParameters, async (req, res) => {
    try {
        const player = await playerService.updatePlayer(req.params.playerId, req.body);
        res.json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:playerid', async (req, res) => {
  await playerService.deletePlayer(req.params.playerid);
  res.status(204).end();
});

router.post('/add', validateParameters, async (req, res) => {
    try {
        const player = await playerService.addPlayer(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:playerid/recent', async (req, res) => {
  const games = await playerService.getRecentGames(req.params.playerid);
  res.json(games);
});

export default router;