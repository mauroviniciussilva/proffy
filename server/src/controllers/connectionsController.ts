import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    async count(req: Request, res: Response) {
        const { total } = (await db('connections').count('* as total'))[0];
        return res.json(total);
    }

    async create(req: Request, res: Response) {
        const { user_id } = req.body;
        await db('connections').insert({ user_id });
        return res.status(201).send();
    }
}