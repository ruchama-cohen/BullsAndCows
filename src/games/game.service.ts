import {Game} from './game.model';
import { calcBullPgia } from './game.logic';


function generateSecretCode(): number[] {
  const digits = [1,2,3,4,5,6,7,8,9];
  const code: number[] = [];
  while (code.length < 4) {
    const idx = Math.floor(Math.random() * digits.length);
    code.push(digits.splice(idx, 1)[0]);
  }
  return code;
}


export async function startGame(playerId: string) {
  const newGame = new Game({
    playerId,
    secretCode: generateSecretCode(),
    maxAttempts: 10,
    attempts: []
  });
  return await newGame.save();
}

export async function guess(gameId: string, guess: number[]) {
  const game = await Game.findById(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    if (game.status !== 'in-progress') {
        throw new Error('Game ended');
    }
    const result = calcBullPgia(game.secretCode, guess);
     game.attempts.push({ guess, ...result });

  if (result.bulls === 4) {
    game.status = 'won';
    game.winner = true;
  } else if (game.attempts.length >= (game.maxAttempts || 10)) {
    game.status = 'lost';
    game.winner = false;
  }
    await game.save();
   return { ...result, remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length, status: game.status };
}


export async function getGameStatus(gameId: string) {
  const game = await Game.findById(gameId);
    if (!game) {
        throw new Error('Game not found');
    }

    return {
        remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length,
        attempts: game.attempts,
        status: game.status,
    
    };
}

export async function endGame(gameId: string) {
  return await Game.findByIdAndUpdate(gameId, { status: 'ended' }, { new: true });
}





