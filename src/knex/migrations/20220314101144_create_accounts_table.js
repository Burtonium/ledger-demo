const directionsEnum = 'directions_enum';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw('create extension if not exists "uuid-ossp";');

  await knex.raw(`
    CREATE TYPE ${directionsEnum} AS ENUM (\'debit\', \'credit\')
  `);

  await knex.schema.createTable('accounts', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name');
  });

  await knex.schema.createTable('transactions', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.string('name');
  });

  return knex.schema.createTable('entries', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    t.uuid('transactionId').references('id').inTable('transactions');
    t.uuid('accountId').references('id').inTable('accounts');
    t.enum('direction', ['debit', 'credit'], { useNative: true, enumName: directionsEnum, existingType: true });
    t.integer('amount').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw('DROP TYPE directions_enum');
  await knex.schema.dropTable('accounts');
  await knex.schema.dropTable('transactions');
  await knex.schema.dropTable('entries');
};
