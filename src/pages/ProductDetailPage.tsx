import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProduct, products, type Product } from '@/data/products';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { ProductArt } from '@/components/ProductArt';

export default function ProductDetailPage({
  onAdded,
  onQuickView,
}: {
  onAdded: (product: Product) => void;
  onQuickView: (product: Product) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProduct(slug || '');

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [alt, setAlt] = useState(false);

  if (!product) {
    return (
      <main className="section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p className="eyebrow">PRODUCT NOT FOUND</p>
        <h1 className="serif">Pickle profile not found</h1>
        <p style={{ margin: '16px 0 32px' }}>The pickle you are looking for does not exist in our collection.</p>
        <Link to="/pickles" className="button" style={{ textDecoration: 'none' }}>
          Back to collection
        </Link>
      </main>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addItem(product);
    onAdded(product);
    navigate('/checkout');
  };

  return (
    <main className="detail-page section">
      <Link className="back-link" to="/pickles">
        <ChevronLeft size={16} /> Back to collection
      </Link>

      <div className="detail-layout">
        <div className="detail-gallery">
          {alt ? (
            <ProductArt product={{ ...product, color: product.accent, accent: product.color }} large />
          ) : (
            <ProductArt product={product} large />
          )}
          <div className="thumbs">
            <button onClick={() => setAlt(false)} className={!alt ? 'active' : ''}>
              <ProductArt product={product} />
            </button>
            <button onClick={() => setAlt(true)} className={alt ? 'active' : ''}>
              <ProductArt product={{ ...product, color: product.accent, accent: product.color }} />
            </button>
          </div>
        </div>

        <div className="detail-copy">
          <p className="eyebrow">
            {product.region} · {product.weight}
          </p>
          <h1 className="serif">{product.name}</h1>
          <p className="detail-lede">{product.description}</p>
          <div className="detail-price">
            ₹{product.price} <small>· {product.weight}</small>
          </div>

          <div className="detail-buy">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={13} />
              </button>
              <b>{quantity}</b>
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus size={13} />
              </button>
            </div>
            <Button
              onClick={() => {
                for (let i = 0; i < quantity; i += 1) addItem(product);
                onAdded(product);
              }}
            >
              Add to Barni
            </Button>
          </div>

          <button className="buy-now" onClick={handleBuyNow}>
            Buy now
          </button>

          <div className="detail-facts">
            <div>
              <span>FLAVOUR PROFILE</span>
              <strong>{product.flavourProfile}</strong>
            </div>
            <div>
              <span>INGREDIENTS</span>
              <strong>{product.ingredients.join(' · ')}</strong>
            </div>
            <div>
              <span>STORAGE</span>
              <strong>Replaceable product information</strong>
            </div>
            <div>
              <span>SHIPPING</span>
              <strong>Calculated at checkout</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="related-section">
        <p className="eyebrow">YOU MIGHT ALSO LIKE</p>
        <div className="featured-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAdded={onAdded} />
          ))}
        </div>
      </div>
    </main>
  );
}
