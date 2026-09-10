import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

export default function ProductCard({
  product,
  onQuickView,
  onAdded,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
  onAdded: (product: Product) => void;
}) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <article className="product-card">
      <div
        className="product-visual"
        onClick={() => onQuickView(product)}
      >
        <img src={product.image} alt={product.name} className="product-image" />
        <button
          className={`wishlist ${liked ? 'liked' : ''}`}
          aria-label="Add to wishlist"
          onClick={(event) => {
            event.stopPropagation();
            setLiked(!liked);
          }}
        >
          {liked ? '♥' : '♡'}
        </button>
        <span className="view-detail">
          VIEW DETAILS <ArrowRight size={13} />
        </span>
      </div>
      <div className="product-info">
        <div>
          <p className="eyebrow">
            {product.region} · {product.weight}
          </p>
          <h3>
            <Link to={`/product/${product.slug}`} className="product-title-link">
              {product.name}
            </Link>
          </h3>
        </div>
        <span className="price">₹{product.price}</span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-bottom">
        <span className="rating">
          ★★★★★ <small>Coming soon</small>
        </span>
        <button
          className="add-button"
          onClick={() => {
            addItem(product);
            onAdded(product);
          }}
        >
          <Plus size={15} /> Add to Barni
        </button>
      </div>
    </article>
  );
}





