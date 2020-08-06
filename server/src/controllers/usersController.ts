import { Request, Response } from 'express'
import db from '../database/connection';

export default class UsersController {
    async create (req: Request, res: Response) {
        const { body } = req;
        const { first_name, last_name, avatar, whatsapp, bio, type } = body;
        let insertedUsersIds;

        try {
            const { id: user_type_id } = await db.table('user_types').first('id').where('description', type);
        
            insertedUsersIds = await db('users').insert({
                first_name,
                last_name,
                avatar,
                whatsapp,
                bio,
                user_type_id
            });
        } catch (err) {
            return res.status(400).json({ error: 'Unexpected error while creating a new user.' });
        }
    
        return res.status(201).json({ user_id: insertedUsersIds[0] });
    }
}