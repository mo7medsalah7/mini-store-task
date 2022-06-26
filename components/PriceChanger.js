import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import DropDownMenu from './DropDownMenu';

const PriceChangerContainer = styled.div`
  position: relative;
  z-index: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
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

  //Show/ Hide Dropdown
  function togglePriceDropDown() {
    setShowDropdownMenu(!showDropdownMenu);
  }

  // Apollo useQuery
  const { loading, error, data } = useQuery(CURRENCY_QUERY);
  console.log(data);

  return (
    <PriceChangerContainer>
      <ButtonsContainer onClick={togglePriceDropDown}>
        {/* Dollar Sign Button  */}
        <button>
          <svg
            width="32"
            height="30"
            viewBox="0 0 32 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.13 20.798L16.138 20.816V23.426H15.13V20.798ZM15.22 20.6V9.638L16.03 9.512V20.636L15.22 20.6ZM15.13 6.83H16.138V9.404L15.13 9.53V6.83ZM19.144 11.402C19 11.234 18.808 11.072 18.568 10.916C18.328 10.76 18.058 10.622 17.758 10.502C17.458 10.37 17.128 10.268 16.768 10.196C16.42 10.112 16.054 10.07 15.67 10.07C14.686 10.07 13.96 10.256 13.492 10.628C13.024 11 12.79 11.51 12.79 12.158C12.79 12.614 12.91 12.974 13.15 13.238C13.39 13.502 13.756 13.718 14.248 13.886C14.752 14.054 15.388 14.228 16.156 14.408C17.044 14.6 17.812 14.834 18.46 15.11C19.108 15.386 19.606 15.758 19.954 16.226C20.302 16.682 20.476 17.294 20.476 18.062C20.476 18.674 20.356 19.208 20.116 19.664C19.888 20.108 19.564 20.48 19.144 20.78C18.724 21.068 18.232 21.284 17.668 21.428C17.104 21.56 16.492 21.626 15.832 21.626C15.184 21.626 14.548 21.56 13.924 21.428C13.312 21.284 12.73 21.08 12.178 20.816C11.626 20.552 11.11 20.222 10.63 19.826L11.404 18.458C11.596 18.662 11.842 18.866 12.142 19.07C12.454 19.262 12.802 19.442 13.186 19.61C13.582 19.778 14.008 19.916 14.464 20.024C14.92 20.12 15.388 20.168 15.868 20.168C16.78 20.168 17.488 20.006 17.992 19.682C18.496 19.346 18.748 18.86 18.748 18.224C18.748 17.744 18.604 17.36 18.316 17.072C18.04 16.784 17.626 16.544 17.074 16.352C16.522 16.16 15.85 15.968 15.058 15.776C14.194 15.56 13.468 15.326 12.88 15.074C12.292 14.81 11.848 14.468 11.548 14.048C11.26 13.628 11.116 13.082 11.116 12.41C11.116 11.594 11.314 10.904 11.71 10.34C12.106 9.776 12.652 9.35 13.348 9.062C14.044 8.774 14.83 8.63 15.706 8.63C16.282 8.63 16.816 8.69 17.308 8.81C17.812 8.93 18.28 9.098 18.712 9.314C19.144 9.53 19.54 9.788 19.9 10.088L19.144 11.402Z"
              fill="#1D1F22"
            />
          </svg>
        </button>
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
                stroke-linecap="round"
                stroke-linejoin="round"
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        )}
      </ButtonsContainer>
      {!showDropdownMenu && (
        <DropDownMenu>
          {data?.currencies?.map((currency) => (
            <CurrencyInfo key={currency.symbol}>
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
