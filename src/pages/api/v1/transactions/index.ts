import { getKnex } from '../../../../knex';
import { Direction, Entry, Transaction } from '../../../../api/types';
import type { Handler } from '../../types';
import { handle } from '../../utils';

const post: Handler = async (req, res) => {
  const knex = getKnex();
  const { id, name, from, to, amount } = JSON.parse(req.body);

  knex.transaction(async (trx) => {
    const [{ id: transactionId }] = await knex<Transaction>('transactions')
      .transacting(trx)
      .returning('id')
      .insert({ id, name }) as Pick<Transaction, 'id'>[];

    await knex.raw(
      `UPDATE accounts SET balance = balance - ? WHERE id = ?`,
      [amount, from]
    ).transacting(trx);
    
    await knex<Entry>('entries')
      .transacting(trx)
      .insert({
        accountId: from,
        transactionId,
        direction: Direction.DEBIT,
        amount
      });

    await knex.raw(
      `UPDATE accounts SET balance = balance + ? WHERE id = ?`,
      [amount, to]
    ).transacting(trx);
      
    
    await knex<Entry>('entries')
      .transacting(trx)
      .insert({
        accountId: to,
        transactionId,
        direction: Direction.CREDIT,
        amount
      });
  })


  res.status(201).send({ name });
}

const get: Handler<Transaction[]> = async (req, res) => {
  const knex = getKnex();

  const transactions = await knex<Transaction>('transactions');

  res.status(200).json(transactions);
}

export default handle({
  POST: post,
  GET: get
});