import { Request, Response, NextFunction } from "express";

export const validateParameters = (req: Request, res: Response, next: NextFunction): void => {
   const guess = req.body.guess as number[];


 

    if (!guess.every(num => Number.isInteger(num) && num >= 1 && num <= 9)) {
        res.status(400).json({ error: 'Numbers must be between 1-9' });
        return;
    }

    if (guess.length !== 4) {
        res.status(400).json({ error: 'Guess must be an array of 4 numbers' });
        return;
    }

    if (new Set(guess).size !== guess.length) {
        res.status(400).json({ error: 'Numbers must be unique' });
        return;
    }
    
    next();
};