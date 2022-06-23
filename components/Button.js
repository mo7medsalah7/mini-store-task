import React from 'react';
import styled from 'styled-components';

const GlobalButton = styled.button`
  all: unset;

  background-color: ${(props) =>
    props.inStock ? '#5ece7b' : 'rgba(94, 206, 123, 0.5)'};
  color: #fff;
  text-transform: uppercase;
  cursor: ${(props) => (props.inStock ? 'pointer' : 'not-allowed')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding: 1rem 1rem;
`;

function Button({ inStock, data, handleClick }) {
  return (
    <GlobalButton inStock={inStock} onClick={handleClick}>
      {data}
    </GlobalButton>
  );
}

export default Button;
