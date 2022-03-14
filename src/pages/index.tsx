import { Formik, Form, Field } from 'formik';
import { groupBy } from 'lodash';
import { Account, Transaction } from '../api/types';
import { isCredit, isDebit } from '../api/utils';
import { createAccount, useAccounts, sendFunds, useTransactions, useEntries } from '../api/client';
import { tuple } from '../utils';

const Home = () => {
  const all = tuple(
    useAccounts(),
    useEntries(),
    useTransactions()
  );

  const [accounts, entries, transactions] = all;

  const entriesByTransaction = groupBy(entries.data, 'transactionId') ?? {};

  if (all.some(({ error }) => error)) {
    return <>Error...</>
  }

  if (all.some(({ data }) => data === undefined)) {
    return <>Loading...</>
  }

  return (
    <>
      <div>
        <h4 className='title'>
          Create Account
        </h4>
        <Formik
          initialValues={{ balance: 0, name: ''} as Account}
          onSubmit={async (
            values,
            { setSubmitting }
          ) => {
            setSubmitting(true);
            await createAccount(values);
            accounts.mutate();
            setSubmitting(false)
          }}
        >
          <Form style={{ maxWidth: '24rem' }}>
            <Field className="input" id="name" name="name" placeholder="Name" />&nbsp;
            <Field className="input" id="balance" name="balance" placeholder="Balance" type='number' />
            <button className="button is-primary mt-3" type="submit">
              Create
            </button>
          </Form>
        </Formik>
        <h4 className='title'>
          Created Accounts
        </h4>
        <ul>
          {accounts.data?.map((account) => (
            <li key={account.id}>
              Name: {account.name}, balance: {account.balance} &nbsp;
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className='title'>
          Create Transaction
        </h4>
        <Formik
          initialValues={{} as Transaction}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await sendFunds(values);
            accounts.mutate();
            transactions.mutate();
            entries.mutate();
            setSubmitting(false);
          }}
        >
          <Form style={{ maxWidth: '24rem' }}>
            <div className="field">
              <label htmlFor="from">From</label>
              <Field className="input" id="from" as="select" name="from" placeholder="From">
                {accounts.data?.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </Field>
            </div>
            <div className="field">
              <label htmlFor="to">To</label>&nbsp;
              <Field className="input" id="to" as="select" name="to" placeholder="To">
                {accounts.data?.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </Field>
            </div>
            <div className="field">
              <Field className="input" id="amount" name="amount" placeholder="Amount" type='number' />
            </div>
            <button type="submit" className='button is-primary'>
              Send
            </button>
          </Form>
        </Formik>
        <h4 className='title'>
          Created Transactions
        </h4>
        <ul>
          {transactions.data?.map((tx) => (
            <li key={tx.id}>
              Transaction id: {tx.id}<br/>
              From: {entriesByTransaction[tx.id]?.find(isDebit)?.accountId ?? 'unknown'}<br/>
              To: {entriesByTransaction[tx.id]?.find(isCredit)?.accountId ?? 'unknown'}&nbsp;
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;