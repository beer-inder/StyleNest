import { categories } from '../../../lib/products';
import ShopClient from '../../../components/ShopClient';

export function generateStaticParams() {
  return categories.map(c => ({ category: c.slug }));
}

export default async function ShopPage({ params }) {
  const resolvedParams = await params;
  return <ShopClient category={resolvedParams.category} />;
}
