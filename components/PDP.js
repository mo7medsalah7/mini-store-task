import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import heroImage from '../utils.js/heroImage';

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
  grid-template-columns: 0.5fr repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;
const Left = styled.div`
  grid-area: 1 / 1 / 2 / 2;
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
    /* max-width: 100%; */
  }
`;
const Details = styled.div`
  grid-area: 1 / 3 / 2 / 4;
`;
export default function PDP({ query }) {
  // Apollo useQuery
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      id: query.id,
    },
  });
  // React useState to manage the bigger image
  const [imageUrl, setImageUrl] = React.useState({ url: '' });

  // Supposing the bigger image is the first one
  // const heroImage = `${data?.product.gallery.find((url) => url)}`;

  useEffect(() => {
    if (!loading && data) {
      setImageUrl({ url: heroImage(data.product) });
    }
  }, [loading, data]);

  // Loading
  if (loading) return <p>Loading ....</p>;
  // Handling Error
  if (error) return <p>Error: {error.message} ....</p>;

  function handleChangeImage(url) {
    setImageUrl({ url });
  }

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
      <Details>3</Details>
    </GridContainer>
  );
}
