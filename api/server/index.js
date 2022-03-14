const fetcher = (...args) => fetch(...args).then(res => res.json());

const prefix = '/api/v1';

export const getMarkets = async () => {
  const url = new URL(`${prefix}/markets`, process.env.BASE_URL);
  const markets = await fetcher(url) || [];

  return {
    markets,
  }
}

