export const prefix = process.env.API_PREFIX || '/api/v1';

export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => {
  if (res.status >= 400) {
    const error = `Error at [${args[1]?.method || 'GET'}] ${args[0]}: ${res.statusText}`;
    throw new Error(error);
  }
  return res.json()
});

export type Fetcher = typeof fetcher;