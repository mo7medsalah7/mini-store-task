import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const CategoryTitle = styled.div`
  margin-bottom: 3rem;
  h2 {
    font-size: 42px;
    font-weight: 400;
    color: var(--c-text);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const SingleProduct = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 0.7rem;
  padding: 16px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    -webkit-box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  h2.product-title {
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    color: ${(props) => (!props.inStock ? '#8D8F9A' : `var(--c-black)`)};
  }
  .price {
    span {
      font-weight: 700;
      font-size: 18px;
      color: ${(props) => !props.inStock && '#8D8F9A'};
    }
  }
`;

const FigureContainer = styled.div`
  /* justify-content: center;
  align-items: center;
  display: flex; */
  height: 90%;
  position: relative;
  padding: 16px;
`;

const ProductImage = styled.img`
  object-fit: contain;
  height: 100%;
  max-width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    color: #8d8f9a;
  }
`;

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

function Product({ item }) {
  return (
    <>
      <CategoryTitle>
        <h2>{item.name}</h2>
      </CategoryTitle>
      <ProductsContainer>
        {item?.products?.map((item) => {
          // Getting products of specific category

          const { loading, error, data } = useQuery(PRODUCT_QUERY, {
            variables: {
              id: item.id,
            },
          });
          console.log(data?.product);
          // Loading
          if (loading) return <p>Loading ....</p>;
          // Handling Error
          if (error) return <p>Error: {error.message} ....</p>;

          // Grab Product
          const { product } = data;
          // Getting Image Url
          const imageUrl = `${product.gallery.find((url) => url)}`;
          // Filtering Price On Label 'USD'
          const price = product.prices.filter(
            (price) => price.currency.label === 'USD'
          );

          return (
            <SingleProduct key={product.id}>
              <FigureContainer>
                <ProductImage src={imageUrl} alt="product image" />
                {!product.inStock && (
                  <Overlay>
                    <p>OUT OF STOCK</p>
                  </Overlay>
                )}
              </FigureContainer>
              <h2 className="product-title" inStock={product?.inStock}>
                {product.name}
              </h2>
              {price.map((item) => (
                <span>
                  {item.currency.symbol}
                  {item.amount}
                </span>
              ))}
            </SingleProduct>
          );
        })}
      </ProductsContainer>
    </>
  );
}

export default Product;
