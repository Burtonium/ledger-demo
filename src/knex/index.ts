import knex, { Knex } from 'knex';
import config from '../../knexfile';

// @ts-ignore
let cached = global.pg;
if (!cached) {
  cached = {};
  // @ts-ignore
  global.pg = cached;
}

export function getKnex(): Knex {
  if (!cached.instance) cached.instance = knex(config)
  return cached.instance
}