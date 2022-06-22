import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: String!) {
    product(id: $id) {
      id
      name
      description
      inStock
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  div:first-child {
    grid-area: 1 / 1 / 2 / 2;
    width: 40%;
  }
  div:nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
  }
  div:nth-child(3) {
    grid-area: 1 / 3 / 2 / 4;
  }
`;
export default function PDP({ query }) {
  return (
    <GridContainer>
      <div className="">1</div>
      <div>2</div>
      <div>3</div>
    </GridContainer>
  );
}
