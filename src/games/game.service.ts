import {Game} from './game.model';
import { calcBullPgia } from './game.logic';
import mongoose from 'mongoose';

function generateSecretCode(): number[] {
  const digits = [1,2,3,4,5,6,7,8,9];
  const code: number[] = [];
  while (code.length < 4) {
    const idx = Math.floor(Math.random() * digits.length);
    code.push(digits.splice(idx, 1)[0]);
  }
  return code;
}

export async function startGame(data: any) {
  console.log('startGame received data:', data);
  console.log('data keys:', Object.keys(data || {}));
  
  // אם אין playerId - ניצור משחק אנונימי
  let playerId = null;
  
  if (data && data.playerId) {
    if (!mongoose.Types.ObjectId.isValid(data.playerId)) {
      throw new Error("Invalid player ID format: ${data.playerId}");
    }
    playerId = data.playerId;
  }

  console.log('Using playerId:', playerId);

  const newGame = new Game({
    playerId: playerId, // יכול להיות null
    secretCode: generateSecretCode(),
    maxAttempts: 10,
    attempts: []
  });
  
  const savedGame = await newGame.save();
  console.log('Game created successfully with ID:', savedGame._id);
  return savedGame;
}


export async function guess(gameId: string, guess: number[]) {
  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      throw new Error('Invalid game ID format');
    }

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
    return { 
      ...result, 
      remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length, 
      status: game.status 
    };
  } catch (error) {
    console.error('Error in guess:', error);
    throw error;
  }
}

export async function getGameStatus(gameId: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      throw new Error('Invalid game ID format');
    }

    const game = await Game.findById(gameId);
    if (!game) {
        throw new Error('Game not found');
    }

    return {
        remainingAttempts: (game.maxAttempts ?? 10) - game.attempts.length,
        attempts: game.attempts,
        status: game.status,
    };
  } catch (error) {
    console.error('Error in getGameStatus:', error);
    throw error;
  }
}

export async function endGame(gameId: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      throw new Error('Invalid game ID format');
    }

    return await Game.findByIdAndUpdate(gameId, { status: 'ended' }, { new: true });
  } catch (error) {
    console.error('Error in endGame:', error);
    throw error;
  }
}