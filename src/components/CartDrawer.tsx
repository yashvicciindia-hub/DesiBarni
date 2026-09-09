import { useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from './Button';
import { ProductArt } from './ProductArt';

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleExplore = () => {
    onClose();
    navigate('/pickles');
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true">
      <button className="overlay-close" aria-label="Close cart" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="drawer-head">
          <div>
            <p className="eyebrow">YOUR BARNI</p>
            <h2>Your Barni</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              <ShoppingBag />
            </div>
            <h3>Your Barni is empty.</h3>
            <p>Begin with a flavour that feels like home.</p>
            <button className="text-link" onClick={handleExplore}>
              Explore pickles <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <div className="cart-item" key={product.id}>
                  <ProductArt product={product} />
                  <div className="cart-item-detail">
                    <div className="cart-item-title">
                      <h4>{product.name}</h4>
                      <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`}>
                        <X size={14} />
                      </button>
                    </div>
                    <span>₹{product.price}</span>
                    <div className="quantity">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <b>{quantity}</b>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-summary">
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="total">
                <span>Total</span>
                <strong>₹{subtotal}</strong>
              </div>
              <Button onClick={handleCheckout}>Checkout</Button>
              <small>Demo checkout · payment integration ready to connect</small>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
