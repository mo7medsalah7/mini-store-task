import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';

export default function Category() {
  const { query } = useRouter();
  return (
    <div>
      <Products query={query} />
    </div>
  );
}
