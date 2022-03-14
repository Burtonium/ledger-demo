export enum Direction {
  DEBIT = 'debit',
  CREDIT = 'credit'
}

export type Account = {
  id: string;
  name?: string;
  balance: number;
}

export type Entry = {
  id: string;
  transactionId: string;
  accountId: string;
  amount: number;
  direction: Direction;
}

export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  name?: string;
}