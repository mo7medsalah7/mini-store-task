import React from 'react';
import { useRouter } from 'next/dist/client/router';
import PDP from '../../components/PDP';
import Head from 'next/head';

function SingleProduct() {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>{query.id}</title>
      </Head>
      <PDP query={query} />
    </>
  );
}

export default SingleProduct;
