import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';

export default function ProductsPage() {
  const router = useRouter();
  console.log(router);
  const { query } = useRouter();
  return (
    <div>
      <Products />
    </div>
  );
}
