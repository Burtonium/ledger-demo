import { Direction, Entry } from './types';

export const isDebit = ({ direction }: Entry) => direction === Direction.DEBIT;
export const isCredit = ({ direction }: Entry) => direction === Direction.CREDIT;
