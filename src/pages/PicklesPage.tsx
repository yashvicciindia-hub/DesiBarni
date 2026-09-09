import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function PicklesPage({
  onQuickView,
  onAdded,
}: {
  onQuickView: (product: Product) => void;
  onAdded: (product: Product) => void;
}) {
  const [sort, setSort] = useState('Featured');
  const [filter, setFilter] = useState('All flavours');
  const [query, setQuery] = useState('');

  const list = useMemo(
    () =>
      [...products]
        .filter(
          (p) =>
            filter === 'All flavours' ||
            p.region.toLowerCase().includes(filter.toLowerCase())
        )
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.flavourProfile.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) =>
          sort === 'Price: low to high'
            ? a.price - b.price
            : sort === 'Price: high to low'
            ? b.price - a.price
            : 0
        ),
    [filter, query, sort]
  );

  return (
    <main className="listing section">
      <div className="listing-head">
        <p className="eyebrow">THE DESI BARNI COLLECTION</p>
        <h1 className="serif">
          Seven flavours.
          <br />
          <em>One love for pickle.</em>
        </h1>
        <p>
          Explore the full collection of regional tastes. Product details and availability are ready to connect to inventory.
        </p>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection..."
            aria-label="Search pickles"
          />
        </div>

        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>All flavours</option>
          <option>North</option>
          <option>West</option>
          <option>South</option>
          <option>East</option>
          <option>Northeast</option>
        </select>

        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option>Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>

      <div className="all-products-grid">
        {list.length > 0 ? (
          list.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAdded={onAdded}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0' }}>
            <p className="eyebrow">NO PICKLES FOUND</p>
            <h3 className="serif">No matching pickle profiles</h3>
            <p className="muted">Try adjusting your search query or filter selection.</p>
          </div>
        )}
      </div>
    </main>
  );
}
