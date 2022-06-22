import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import heroImage from '../utils.js/heroImage';
import Title from './Title';
import getPrice from '../utils.js/get-price';

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
    button.cart-icon {
      display: flex;
    }
  }
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  color: ${(props) => (!props.inStock ? '#8D8F9A' : '#000')};
`;
const ProductPrice = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => (!props.inStock ? '#8D8F9A' : '#000')};
`;

const FigureContainer = styled.div`
  /* justify-content: center;
  align-items: center;
  display: flex; */
  height: 90%;
  position: relative;
  padding: 16px;
  button.cart-icon {
    all: unset;
    position: absolute;
    background-color: #5ece7b;
    border-radius: 50%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10%;
    bottom: 0%;
    cursor: pointer;
    display: none;
  }
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
          // Loading
          if (loading) return <p>Loading ....</p>;
          // Handling Error
          if (error) return <p>Error: {error.message} ....</p>;

          // Grab Product
          const { product } = data;
          // Filtering Price On Label 'USD'
          const price = getPrice(product, 'USD');

          return (
            <Link href={`/product/${product.id}`}>
              <SingleProduct key={product.id}>
                <FigureContainer>
                  <ProductImage src={heroImage(product)} alt="product image" />
                  {!product.inStock && (
                    <Overlay>
                      <p>OUT OF STOCK</p>
                    </Overlay>
                  )}

                  <Link href="/">
                    <button className="cart-icon">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.4736 5.8484C23.0186 5.29247 22.3109 4.95457 21.5785 4.95457H6.19066L5.71097 3.16691C5.43262 2.12772 4.47323 1.40283 3.36082 1.40283H0.783719C0.354361 1.40283 0 1.74072 0 2.15227C0 2.56284 0.353351 2.9017 0.783719 2.9017H3.36082C3.73985 2.9017 4.06854 3.14333 4.1692 3.50577L7.25167 15.2494C7.53003 16.2886 8.48941 17.0135 9.60182 17.0135H19.6833C20.7947 17.0135 21.7808 16.2886 22.0335 15.2494L23.9286 7.80699C24.1053 7.1293 23.9543 6.40442 23.4736 5.84848L23.4736 5.8484ZM22.3879 7.46712L20.4927 14.9095C20.3921 15.272 20.0634 15.5136 19.6844 15.5136H9.60185C9.22282 15.5136 8.89413 15.272 8.79347 14.9095L6.59533 6.47717H21.5796C21.8323 6.47717 22.085 6.59798 22.237 6.79148C22.388 6.98403 22.463 7.22566 22.388 7.46729L22.3879 7.46712Z"
                          fill="white"
                        />
                        <path
                          d="M10.1332 17.9778C8.69316 17.9778 7.50586 19.1132 7.50586 20.4902C7.50586 21.8672 8.69326 23.0027 10.1332 23.0027C11.5733 23.0036 12.7606 21.8682 12.7606 20.491C12.7606 19.1137 11.5732 17.9775 10.1332 17.9775V17.9778ZM10.1332 21.4814C9.55188 21.4814 9.09685 21.0463 9.09685 20.4903C9.09685 19.9344 9.55188 19.4993 10.1332 19.4993C10.7146 19.4993 11.1696 19.9344 11.1696 20.4903C11.1687 21.0227 10.689 21.4814 10.1332 21.4814Z"
                          fill="white"
                        />
                        <path
                          d="M18.8251 17.978C17.3851 17.978 16.1978 19.1135 16.1978 20.4905C16.1978 21.8675 17.3852 23.0029 18.8251 23.0029C20.2651 23.0029 21.4525 21.8675 21.4525 20.4905C21.4279 19.1143 20.2651 17.978 18.8251 17.978ZM18.8251 21.4816C18.2438 21.4816 17.7887 21.0465 17.7887 20.4906C17.7887 19.9346 18.2438 19.4995 18.8251 19.4995C19.4065 19.4995 19.8615 19.9346 19.8615 20.4906C19.8615 21.0229 19.3809 21.4816 18.8251 21.4816Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </Link>
                </FigureContainer>
                <ProductTitle inStock={product?.inStock}>
                  <Title
                    fontSize="18px"
                    fontWeight="400"
                    lineHeight="30"
                    data={data?.product?.name}
                  />
                </ProductTitle>
                {price.map((item) => (
                  <ProductPrice inStock={product?.inStock}>
                    {item.currency.symbol}
                    {item.amount}
                  </ProductPrice>
                ))}
              </SingleProduct>
            </Link>
          );
        })}
      </ProductsContainer>
    </>
  );
}

export default Product;
