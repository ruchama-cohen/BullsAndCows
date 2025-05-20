import mongoose from 'mongoose';
import { Player } from './player.model';
import { Game } from '../games/game.model';

export async function addPlayer(data: any) {
  const player = new Player(data);
  return await player.save();
}

export async function updatePlayer(id: string, data: any) {
  return await Player.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePlayer(id: string) {
 return  await Player.findByIdAndDelete(id);
}

export async function getPlayerById(id:string){
    const player=Player.findById(id);
    return await player;
}

export async function getLeaderboard() {
  return await Player.find()
    .sort({ wins: -1 })
    .limit(10)
    .select('name wins totalGames');
}

export async function getRecentGames(playerId: string) {
  return await Game.find({ playerId })
    .sort({ createdAt: -1 })
    .limit(5);
}