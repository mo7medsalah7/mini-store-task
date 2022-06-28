import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { usePrice } from '../utils.js/priceState';
import DropDownMenu from './DropDownMenu';

const PriceChangerContainer = styled.div`
  position: relative;
  z-index: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  button.currency-btn {
    font-size: 22px;
    font-weight: 700;
  }
`;

const CurrencyInfo = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

// Writing a Query to get currencies
const CURRENCY_QUERY = gql`
  query CURRENCY_QUERY {
    currencies {
      label
      symbol
    }
  }
`;

function PriceChanger() {
  const [showDropdownMenu, setShowDropdownMenu] = React.useState(false);
  const [currencySymbol, setCurrencySymbol] = React.useState('$');
  const { changeLabel } = usePrice();
  //Show/ Hide Dropdown
  function togglePriceDropDown() {
    setShowDropdownMenu(!showDropdownMenu);
  }

  async function handleChangeLabel(currency) {
    await changeLabel(currency);
    await setShowDropdownMenu(!showDropdownMenu);
    await setCurrencySymbol(currency.symbol);
  }

  // Apollo useQuery
  const { loading, error, data } = useQuery(CURRENCY_QUERY);

  const currency = data?.currencies?.map((currency) => currency);
  return (
    <PriceChangerContainer>
      <ButtonsContainer onClick={togglePriceDropDown}>
        {/* Currency Symbol Button  */}
        <button className="currency-btn">{currencySymbol}</button>
        {/* Arrow Down Button & UP */}
        {!showDropdownMenu ? (
          <button>
            <svg
              width="8"
              height="4"
              viewBox="0 0 8 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.5L4 3.5L7 0.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button>
            <svg
              width="8"
              height="4"
              viewBox="0 0 8 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 3.5L4 0.5L1 3.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </ButtonsContainer>
      {showDropdownMenu && (
        <DropDownMenu type="false">
          {data?.currencies?.map((currency) => (
            <CurrencyInfo
              key={currency.symbol}
              onClick={() => handleChangeLabel(currency)}
            >
              <span>{currency.symbol}</span>
              <p>{currency.label}</p>
            </CurrencyInfo>
          ))}
        </DropDownMenu>
      )}
    </PriceChangerContainer>
  );
}

export default PriceChanger;
