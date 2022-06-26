import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Products from '../../components/Products';

export default function Category() {
  const { query } = useRouter();
  return (
    <div>
      <Head>
        <title>Mini Store - {query.category}</title>
      </Head>
      <Products query={query} />
    </div>
  );
}
