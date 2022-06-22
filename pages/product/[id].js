import React from 'react';
import { useRouter } from 'next/dist/client/router';
import PDP from '../../components/PDP';

function SingleProduct() {
  const { query } = useRouter();
  return <PDP query={query} />;
}

export default SingleProduct;
