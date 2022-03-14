import { getKnex } from '../../../../knex';
import {  Entry } from '../../../../api/types';
import { handle } from '../../utils';

export default handle({
  GET: async (_req, res) => {
  const knex = getKnex();

  const entries = await knex<Entry>('entries');
  
  res.status(200).json(entries);
  }
})