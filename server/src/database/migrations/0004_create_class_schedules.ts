import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedules', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.time('from').notNullable();
        table.time('to').notNullable();
        table.integer('class_id').unsigned().notNullable()

        table.foreign('class_id')
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedules');
}