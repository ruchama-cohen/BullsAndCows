import express from 'express';
import cors from 'cors';
import { myDB } from './db/connection';
import playerRoutes from './players/player.controller';
import gameRoutes from './games/game.controller';

const app = express();

 myDB.DB.connectToDb();


app.use(cors());
app.use(express.json()); 

app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'error in server' });
});

export default app;