import React, { useEffect, useRef } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import heroImage from '../utils.js/heroImage';
import Title from './Title';
import { usePrice } from '../utils.js/priceState';

import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Attribute from './Attribute';
import Button from './Button';
import { parseDescription } from '../utils.js/descriptionParsed';

// Writing a Query to fetch the product
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

// CSS-in-JS
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const PDPLeftSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Left = styled.div`
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
  justify-content: center;
  display: flex;
  align-items: center;
  height: 80vh;
  img {
    height: 100%;
    object-fit: contain;
    max-width: 85%;
  }
`;
const Details = styled.div`
  /* padding: 1rem 0rem 1rem 4rem; */
  display: flex;
  justify-content: center;
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

const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-family: Roboto;
`;

export default function PDP({ query }) {
  const dispatch = useDispatch();
  const { getPrice } = usePrice();

  // Apollo useQuery
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      id: query.id,
    },
  });
  // React useState to manage the bigger image
  const [imageUrl, setImageUrl] = React.useState({ url: '' });

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

  const price = getPrice(data?.product);

  // adding Quantity property to the object
  // object came from backend without Quantity
  const dreamProduct = { ...data?.product, qty: 1 };

  function handleAddToCart(data) {
    dispatch(addToCart(data));
  }

  // The description provided in HTML format should be parsed
  // and presented as HTML, not as plain text

  const description = parseDescription(data);

  return (
    <>
      <GridContainer>
        <PDPLeftSide>
          <Left>
            {data?.product?.gallery
              .map((url) => (
                <img
                  key={url}
                  src={url}
                  onClick={() => handleChangeImage(url)}
                />
              ))
              .slice(0, 3)}
          </Left>
          <HeroImage>
            <img src={imageUrl.url} alt={data?.product?.name} />
          </HeroImage>
        </PDPLeftSide>

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
              <ProductPrice key={item.amount}>
                {item.currency.symbol}
                {item.amount}
              </ProductPrice>
            ))}
          </PriceContainer>

          <Button
            handleClick={() => handleAddToCart(dreamProduct)}
            inStock={data?.product.inStock}
            data="Add To Cart"
          ></Button>
          <Description>{description}</Description>
        </Details>
      </GridContainer>
    </>
  );
}
