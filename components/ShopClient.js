'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { categories, products, getCategory } from '../lib/products';
import ProductCard from './ProductCard';

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under50', label: 'Under $50', test: price => price < 50 },
  { id: '50to100', label: '$50 - $100', test: price => price >= 50 && price <= 100 },
  { id: 'over100', label: 'Over $100', test: price => price > 100 },
];

export default function ShopClient({ category }) {
  const cat = getCategory(category);
  const [priceRange, setPriceRange] = useState('all');
  const [sort, setSort] = useState('featured');

  const filteredProducts = useMemo(() => {
    const selectedRange = priceRanges.find(range => range.id === priceRange);
    let result = products.filter(p => p.category === category);

    if (selectedRange?.test) {
      result = result.filter(p => selectedRange.test(Number(p.price)));
    }

    return [...result].sort((a, b) => {
      if (sort === 'low') return Number(a.price) - Number(b.price);
      if (sort === 'high') return Number(b.price) - Number(a.price);
      if (sort === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      return 0;
    });
  }, [category, priceRange, sort]);

  if (!cat) {
    return (
      <main className="not-found">
        <h1>Collection not found</h1>
        <Link className="btn" href="/">Back Home</Link>
      </main>
    );
  }

  return (
    <main>
      <div className="breadcrumb">
        <Link href="/">Home</Link> / {cat.name}
      </div>

      <section className="listing">
        <div className="listing-head">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h1>{cat.name}</h1>
            <p>Explore our curated selection of {cat.name.toLowerCase()}.</p>
          </div>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="featured">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="shop-layout">
          <aside>
            <h3>Filter</h3>

            <div>
              <b>Category</b>
              {categories.map(c => (
                <Link
                  className={c.slug === category ? 'active-filter' : ''}
                  href={`/shop/${c.slug}`}
                  key={c.slug}
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <div>
              <b>Size</b>
              <div className="size-filter">
                <span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span>
              </div>
            </div>

            <div className="price-filter">
              <b>Price</b>
              {priceRanges.map(range => (
                <button
                  type="button"
                  key={range.id}
                  className={priceRange === range.id ? 'active-price-filter' : ''}
                  onClick={() => setPriceRange(range.id)}
                  aria-pressed={priceRange === range.id}
                >
                  <span className="filter-radio" />
                  {range.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="listing-products">
            <div className="active-filters">
              <div className="result-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
              {priceRange !== 'all' && (
                <button type="button" onClick={() => setPriceRange('all')}>
                  {priceRanges.find(r => r.id === priceRange)?.label} ×
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map(p => <ProductCard product={p} key={p.slug} />)}
              </div>
            ) : (
              <div className="empty-filter">
                <h2>No products in this price range</h2>
                <p>Try another price range to explore more {cat.name.toLowerCase()}.</p>
                <button type="button" className="btn" onClick={() => setPriceRange('all')}>
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
