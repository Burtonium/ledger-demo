import useSWR, { SWRConfiguration }  from 'swr';

import { Method } from '../../pages/api/types';

import { fetcher, prefix } from '../shared';
import { Account, Entry, Transaction } from '../types';

export const makeGetterHook = <Data, Config extends SWRConfiguration = any>(url: string) => (config?: Config) => {
  return useSWR<Data>(url, fetcher, config);
}

export const useAccounts = makeGetterHook<Account[]>(`${prefix}/accounts`);
export const useTransactions = makeGetterHook<Transaction[]>(`${prefix}/transactions`);
export const useEntries = makeGetterHook<Entry[]>(`${prefix}/entries`);

export const createAccount = async ({ name, balance }: Account) => {
  const data = await fetcher(`${prefix}/accounts`, {
    method: Method.POST,
    body: JSON.stringify({ name, balance })
  })
  return data;
}

export const sendFunds = async ({ from, to, amount }: Transaction) => {
  const data = await fetcher(`${prefix}/transactions`, {
    method: Method.POST,
    body: JSON.stringify({ from, to, amount })
  });
  return data;
}