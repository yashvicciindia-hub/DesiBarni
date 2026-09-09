import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import { ProductArt } from './ProductArt';

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
  const [showAlternate, setShowAlternate] = useState(false);

  return (
    <article className="product-card">
      <div
        className={`product-visual ${showAlternate ? 'show-alternate' : ''}`}
        onMouseEnter={() => setShowAlternate(true)}
        onMouseLeave={() => setShowAlternate(false)}
        onClick={() => onQuickView(product)}
      >
        <div className="product-art product-art-primary">
          <ProductArt product={product} />
        </div>
        <div className="product-art product-art-alt">
          <ProductArt product={{ ...product, color: product.accent, accent: product.color }} />
        </div>
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
        <button
          className="image-toggle"
          aria-label="Show alternate product image"
          onClick={(event) => {
            event.stopPropagation();
            setShowAlternate(!showAlternate);
          }}
        >
          <RefreshCw size={13} />
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
