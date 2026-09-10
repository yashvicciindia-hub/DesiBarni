import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';
import Button from './Button';

export default function QuickView({
  product,
  onClose,
  onAdded,
}: {
  product: Product | null;
  onClose: () => void;
  onAdded: (product: Product) => void;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) return null;

  const handleBuyNow = () => {
    addItem(product);
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <button className="overlay-close" onClick={onClose} aria-label="Close quick view" />
      <div className="quick-view">
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="quick-art">
          <img src={product.image} alt={product.name} className="product-image quick-product-image" />
        </div>
        <div className="quick-copy">
          <p className="eyebrow">
            {product.region} · {product.flavourProfile}
          </p>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="detail-rule" />
          <p className="eyebrow">INGREDIENTS</p>
          <p className="ingredients">{product.ingredients.join(' · ')}</p>
          <div className="quick-buy">
            <strong>₹{product.price}</strong>
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={13} />
              </button>
              <b>{quantity}</b>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={13} />
              </button>
            </div>
          </div>
          <Button
            onClick={() => {
              for (let i = 0; i < quantity; i += 1) addItem(product);
              onAdded(product);
              onClose();
            }}
          >
            Add to Barni
          </Button>
          <button className="buy-now" onClick={handleBuyNow}>
            Buy now
          </button>
          <Link
            className="text-link"
            style={{ marginTop: 18 }}
            to={`/product/${product.slug}`}
            onClick={onClose}
          >
            View full details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
