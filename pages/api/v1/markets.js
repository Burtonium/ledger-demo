export const markets = (randomPrice) => [{
  symbol: 'BTCUSD',
  baseAsset: 'BTC',
  quoteAsset: 'USD',
  price: randomPrice.toFixed(2),
}, {
  symbol: 'BTCCAD',
  baseAsset: 'BTC',
  quoteAsset: 'CAD',
  price: (randomPrice * 1.27).toFixed(2),
}, {
  symbol: 'BTCGBP',
  baseAsset: 'BTC',
  quoteAsset: 'GBP',
  price: (randomPrice * 0.72).toFixed(2),
}, {
  symbol: 'LTCUSD',
  baseAsset: 'LTC',
  quoteAsset: 'USD',
  price: (randomPrice / 84).toFixed(2),
}, {
  symbol: 'LTCCAD',
  baseAsset: 'LTC',
  quoteAsset: 'CAD',
  price: (randomPrice / 84 * 1.27).toFixed(2),
}, {
  symbol: 'LTCGBP',
  baseAsset: 'LTC',
  quoteAsset: 'GBP',
  price: (randomPrice /84 * 0.72).toFixed(2),
}, {
  symbol: 'DOGEDOGE',
  baseAsset: 'DOGE',
  quoteAsset: 'DOGE',
  price: 1,
}];

export default (_req, res) => {
  const randomPrice = 40000 + Math.floor(Math.random() * Math.floor(1000000)) / 100;
  res.status(200).json(markets(randomPrice));
};