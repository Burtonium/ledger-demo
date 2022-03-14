
const CurrencySelect = ({currencies, selected, onChange }) => (
  <div className="select">
    <select
      data-cy="currency-select"
      value={selected}
      onChange={onChange}>
      {currencies.map((currency) => 
        <option
          data-cy="currency-option"
          value={currency}
          key={currency}>
          {currency}
        </option>
      )}
    </select>
  </div>
);
export default CurrencySelect;