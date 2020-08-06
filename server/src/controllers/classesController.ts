import { Request, Response } from 'express'
import db from '../database/connection';

export default class ClassesController {
    async index(req: Request, res: Response) {
        const { query } = req; 

        if (!query.week_day || !query.subject || !query.time) {
            return res.status(400).json({ error: 'Missing filters search classes' });
        }

        const time = `${query.time}:00`;
        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedules.*')
                    .from('class_schedules')
                    .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedules`.`week_day` = ?', [Number(query.week_day)])
                    .whereRaw('`class_schedules`.`from` <= ?', [time])
                    .whereRaw('`class_schedules`.`to` > ?', [time])
            })
            .where('subject', query.subject as string)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return res.json(classes);
    }

    async create(req: Request, res: Response) {
        const { subject, price, user_id, schedule } = req.body;
        const transacion = await db.transaction();
    
        try {
            const insertedClassesIds = await transacion('classes').insert({ subject, price, user_id });
            const class_id = insertedClassesIds[0];
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: `${scheduleItem.from}:00`,
                    to: `${scheduleItem.to}:00`,
                };
            });
    
            await transacion('class_schedules').insert(classSchedule);
            await transacion.commit();
            return res.status(201).send();
        } catch (err) {
            await transacion.rollback();
            return res.status(400).json({ error: 'Unexpected error while creating new class.' });
        }
    }
}