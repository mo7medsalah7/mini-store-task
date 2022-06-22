import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';

export default function OrderPage() {
  const { query } = useRouter();
  return (
    <div>
      <Products />
    </div>
  );
}
