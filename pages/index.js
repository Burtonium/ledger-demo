import { useState } from 'react';
import { uniq } from 'lodash';
import { fetchMarkets } from 'api/client';
import { getMarkets } from 'api/server';
import CurrencySelect from 'components/CurrencySelect';

export const getServerSideProps = async () => {
  const { markets } = await getMarkets();
  return { props: { markets } };
}

const Home = (props) => {
  const initialData = props.markets;
  const { markets, isError } = fetchMarkets({ initialData });
  const baseCurrencies = uniq(markets.map(({ baseAsset }) => baseAsset));
  const [selected, setSelected] = useState(baseCurrencies[0]);
  const quoteMarkets = markets.filter(({ baseAsset }) => baseAsset === selected);

  return isError
    ? <div className="has-text-danger">Something went wrong</div>
    : (
      <div>
        <CurrencySelect
          currencies={baseCurrencies}
          selected={selected}
          onChange={(evt) => setSelected(evt.target.value)}/>
        <div className="conversion-results">
          {quoteMarkets.map(({ quoteAsset, price, symbol }) => (
            <p className="conversion-result" key={symbol}>
              1 <span className="base-asset">{selected}</span> is&nbsp;
              <b className="gradient-underline">
                <span className="quote-price">{price}</span>
                &nbsp;
                <span className="quote-asset">{quoteAsset}</span>
              </b>
            </p>
          ))}
        </div>
      </div>
    );
}

export default Home;