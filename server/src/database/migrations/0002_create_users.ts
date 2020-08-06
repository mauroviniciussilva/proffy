import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp');
        table.string('bio').notNullable();
        table.integer('user_type_id').unsigned().notNullable();

        table.foreign('user_type_id')
            .references('id')
            .inTable('user_types')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}