import Link from 'next/link'; import {products} from '../../../lib/products'; import ProductDetail from '../../../components/ProductDetail';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export default async function ProductPage({params}){const {slug}=await params;const p=products.find(x=>x.slug===slug);if(!p)return <main className="not-found"><h1>Product not found</h1><Link href="/" className="btn">Back Home</Link></main>;return <ProductDetail product={p}/>}
