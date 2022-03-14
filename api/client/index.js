import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const prefix = '/api/v1';

export const fetchMarkets = (config) => {
  const { data, error } = useSWR(`${prefix}/markets`, fetcher, config);

  return {
    markets: data || [],
    isLoading: !error && !data,
    isError: error,
  }
}

