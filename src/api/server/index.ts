import { fetcher, prefix } from '../shared';

export const getAccounts = async () => {
  const url = new URL(`${prefix}/accounts`, process.env.BASE_URL);
  const accounts = await fetcher(url.href) || [];

  return {
    accounts,
  }
}

