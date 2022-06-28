// A function to be re-used
// This to return the price of product based on label
// label may be USD, EUR, etc

import React from 'react';
import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext?.Provider;

// Writing a Query to get currencies
const CURRENCY_QUERY = gql`
  query CURRENCY_QUERY {
    currencies {
      label
      symbol
    }
  }
`;

function PriceStateProvider({ children }) {
  // Apollo useQuery
  const { loading, error, data } = useQuery(CURRENCY_QUERY);

  // define default currency 'USD'
  const defaultCurrency = data?.currencies?.filter(
    (currency) => currency?.label === 'USD'
  );
  // converting the array to object
  const nextCurrency = Object.assign({}, defaultCurrency);

  // define the default currency in a state
  const [slabel, setSlabel] = useState(nextCurrency);

  // store the currency symbol in a state
  const [currencySymbol, setCurrencySymbol] = useState('$');

  // Handling Change Currency Label
  function changeLabel(selected) {
    return setSlabel(selected);
  }

  // Handling getting the data about currencies
  function getPrice(data, label = slabel.label || 'USD') {
    const price = data?.prices?.filter(
      (price) => price.currency.label === label
    );
    return price;
  }

  function changeCurrencySymbol(symbol) {
    return setCurrencySymbol(symbol);
  }

  return (
    <LocalStateProvider
      value={{
        getPrice,
        changeLabel,
        currencySymbol,
        changeCurrencySymbol,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// making a custom hook for accessing the cart local state
function usePrice() {
  //we use a consumer here to access local state
  const all = useContext(LocalStateContext);
  return all;
}

export { usePrice, PriceStateProvider };
