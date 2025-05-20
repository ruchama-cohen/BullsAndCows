import { Player } from './player.model';

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

export async function