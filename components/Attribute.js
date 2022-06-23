import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-around;
`;

const AttributeButton = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  border: 1px solid #1d1f22;
  font-size: 16px;
  font-weight: 400;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

function Attribute({ attributes }) {
  return (
    <ButtonContainer>
      {attributes?.items?.map((item) => {
        return <AttributeButton>{item.value}</AttributeButton>;
      })}
    </ButtonContainer>
  );
}

export default Attribute;
