import React, { useEffect } from 'react';
import Router from 'next/router';

function Main() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === '/') {
      Router.push('/products/all');
    }
  });
  return <div>index</div>;
}

export default Main;
