import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Product from './Product';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  margin-top: 3rem;
`;

const ALL_CATEGORTY_PRODUCTS_QUERY = gql`
  {
    categories {
      name
      products {
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
        attributes {
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

function Products({ query }) {
  const { loading, error, data } = useQuery(ALL_CATEGORTY_PRODUCTS_QUERY);
  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error: {error.message} ....</p>;
  const { categories } = data;
  // filter category based on category in query
  const currentCategory = categories.filter(
    (category) => category.name === query?.category
  );

  return currentCategory.map((item) => (
    <CategoriesContainer key={item.id}>
      <Product item={item} key={item.id} products={item.products} />
    </CategoriesContainer>
  ));
}

export default Products;
