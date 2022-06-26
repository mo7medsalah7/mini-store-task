import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Products from '../../components/Products';

export default function ProductsPage() {
  return (
    <div>
      <Head>
        <title>Mini Store Task</title>
      </Head>
      <Products />
    </div>
  );
}
