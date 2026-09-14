import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import {categories, products} from '../lib/products';

export default function Home(){return <main>
  <section className="hero"><div className="hero-copy"><p className="eyebrow">TIME TO SHINE</p><h1>Elegant Styles<br/>For Every You</h1><p>Discover the latest in women’s fashion, from ethnic wear to modern trends, accessories, footwear and more.</p><Link href="/shop/indian-dresses" className="btn">Shop Now <span>→</span></Link></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90" alt="Woman wearing elegant Indian fashion"/></div></section>
  <section className="section"><div className="section-head"><div><p className="eyebrow">EXPLORE THE COLLECTION</p><h2>Shop by Category</h2></div></div><div className="category-grid">{categories.map(c=><Link className="category-card" href={`/shop/${c.slug}`} key={c.slug}><img src={c.image} alt={c.name}/><div><h3>{c.name}</h3><span>Shop Now →</span></div></Link>)}</div></section>
  <section className="section products-section"><div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured Products</h2></div><Link href="/shop/indian-dresses" className="view-all">View All Products →</Link></div><div className="product-grid">{products.slice(0,8).map(p=><ProductCard key={p.slug} product={p}/>)}</div></section>
  <section className="promo"><div><p className="eyebrow">STYLE IT YOUR WAY</p><h2>Complete Your Look</h2><p>From stunning accessories to statement footwear, find everything you need in one place.</p><Link href="/shop/accessories" className="outline-btn">Shop Accessories →</Link></div><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1100&q=85" alt="Fashion accessories"/></section>
</main>}
