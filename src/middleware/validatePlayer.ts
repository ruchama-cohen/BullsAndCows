import { RequestHandler } from 'express';

export const validateParameters: RequestHandler = (req, res, next) => {
    const { name, password, mail } = req.body;

    if (!name || name.length < 2) {
        res.status(400).json({ error: 'Name must be at least 2 characters' });
        return;
    }

    if (!password || password.length < 6) {
        res.status(400).json({ error: 'Password must be at least 6 characters' });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!mail || !emailRegex.test(mail)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    next();
};