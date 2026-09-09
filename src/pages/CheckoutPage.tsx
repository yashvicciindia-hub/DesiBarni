import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (submitted) {
    return (
      <main className="success-page section">
        <div className="success-mark">
          <Check />
        </div>
        <p className="eyebrow">ORDER NOTE RECEIVED</p>
        <h1 className="serif">
          Your Barni is
          <br />
          <em>being imagined.</em>
        </h1>
        <p>
          This is a demo checkout experience. Your order details were captured locally, ready for a real payment and fulfilment connection.
        </p>
        <Button onClick={() => navigate('/pickles')}>Continue exploring</Button>
      </main>
    );
  }

  return (
    <main className="checkout section">
      <div className="checkout-head">
        <p className="eyebrow">YOUR ORDER</p>
        <h1 className="serif">
          A little India
          <br />
          <em>is on its way.</em>
        </h1>
      </div>
      <div className="checkout-layout">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            clearCart();
          }}
        >
          <p className="eyebrow">DELIVERY DETAILS</p>
          <div className="form-grid">
            <label>
              Name
              <input required placeholder="Your full name" />
            </label>
            <label>
              Phone
              <input required placeholder="+91" />
            </label>
            <label>
              Email
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Address
              <input required placeholder="House, street, area" />
            </label>
            <label>
              City
              <input required placeholder="City" />
            </label>
            <label>
              State
              <input required placeholder="State" />
            </label>
            <label>
              Pincode
              <input required inputMode="numeric" placeholder="000000" />
            </label>
          </div>
          <button className="button" type="submit">
            Place order <ArrowRight size={16} />
          </button>
          <p className="form-note">Demo only — no payment is processed.</p>
        </form>

        <aside className="order-summary">
          <p className="eyebrow">ORDER SUMMARY</p>
          {items.map(({ product, quantity }) => (
            <div className="summary-item" key={product.id}>
              <span>
                {product.name} × {quantity}
              </span>
              <strong>₹{product.price * quantity}</strong>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{subtotal}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
