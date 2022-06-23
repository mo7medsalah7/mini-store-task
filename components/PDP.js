import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import heroImage from '../utils.js/heroImage';
import Title from './Title';
import getPrice from '../utils.js/get-price';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Attribute from './Attribute';

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
      attributes {
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;
const Left = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  img {
    width: 100px;
    height: 90px;
    object-fit: contain;
    cursor: pointer;
  }
`;
const HeroImage = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  height: 80vh;
  img {
    height: 100%;
    object-fit: contain;
    max-width: 85%;
  }
`;
const Details = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  padding: 1rem 0rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const SizeContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  flex-direction: column;
  h3 {
    letter-spacing: 1px;
    font-size: 24px;
  }
  button {
    all: unset;
  }
`;

const PriceContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  flex-direction: column;
  h3 {
    letter-spacing: 1px;
    font-size: 24px;
  }
  button {
    all: unset;
  }
`;

const ProductPrice = styled.span`
  font-weight: 700;
  font-size: 30px;
`;

const AddToCartButton = styled.button`
  all: unset;
  background-color: #5ece7b;
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
const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-family: Roboto;
`;

export default function PDP({ query }) {
  // Redux Toolkit Store for Cart
  const dispatch = useDispatch();

  // Apollo useQuery
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      id: query.id,
    },
  });
  // React useState to manage the bigger image
  const [imageUrl, setImageUrl] = React.useState({ url: '' });
  const dreamData = { ...data };
  console.log('dream', dreamData);
  useEffect(() => {
    if (!loading && data) {
      setImageUrl({ url: heroImage(data.product) });
    }
  }, [loading, data]);

  // Loading
  if (loading) return <p>Loading ....</p>;
  // Handling Error
  if (error) return <p>Error: {error.message} ....</p>;

  // changing hero image
  function handleChangeImage(url) {
    setImageUrl({ url });
  }

  const price = getPrice(data?.product, 'USD');
  return (
    <GridContainer>
      <Left>
        {data?.product?.gallery
          .map((url) => (
            <img src={url} onClick={() => handleChangeImage(url)} />
          ))
          .slice(0, 3)}
      </Left>
      <HeroImage>
        <img src={imageUrl.url} alt={data?.product?.name} />
      </HeroImage>
      <Details>
        <Title
          fontSize="30px"
          fontWeight="600"
          lineHeight="27"
          data={data?.product?.name}
        />
        <p>Running Short</p>
        <SizeContainer>
          <h3>SIZE</h3>
          <Attribute attributes={data?.product?.attributes[0]} />
        </SizeContainer>
        <PriceContainer>
          <h3>PRICE</h3>

          {price.map((item) => (
            <ProductPrice>
              {item.currency.symbol}
              {item.amount}
            </ProductPrice>
          ))}
        </PriceContainer>

        <AddToCartButton
          onClick={() => dispatch(addToCart(data?.product))}
          inStock={data?.product.inStock}
        >
          add to cart
        </AddToCartButton>
        <Description>{data?.product?.description}</Description>
      </Details>
    </GridContainer>
  );
}
