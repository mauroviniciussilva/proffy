import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex('user_types').del();
    await knex('user_types').insert([
        {
            id: 1,
            description: 'Teacher',
        },
        {
            id: 2,
            description: 'Student',
        }
    ]);
};