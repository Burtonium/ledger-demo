import { getKnex } from '../../../../knex';
import { Account } from '../../../../api/types';
import type { Handler } from 'src/pages/api/types';
import { handle } from '../../utils';

const post: Handler = async (req, res) => {
  const knex = getKnex();
  const { id, name, balance } = JSON.parse(req.body);

  await knex<Account>('accounts').insert({ id, name, balance });

  res.status(201).send({ name });
}

const get: Handler<Account[]> = async (req, res) => {
  const knex = getKnex();

  const accounts = await knex<Account>('accounts');

  res.status(200).json(accounts);
}

export default handle({
  POST: post,
  GET: get
});