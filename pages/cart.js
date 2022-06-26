import Head from 'next/head';
import React from 'react';
import Cart from '../components/Cart';

function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Cart>cart</Cart>
    </>
  );
}

export default CartPage;
