import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ORDER_FORM, buildGoogleFormPrefillUrl } from '@/config/googleForm';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const city = String(formData.get('city') || '').trim();
    const state = String(formData.get('state') || '').trim();
    const pincode = String(formData.get('pincode') || '').trim();

    // Required fields validation
    if (!name || !phone || !address || !city || !state || !pincode) {
      return;
    }

    const prefillUrl = buildGoogleFormPrefillUrl({
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
    });

    window.open(prefillUrl, '_blank', 'noopener,noreferrer');
  };

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
        <form onSubmit={handleSubmit}>
          <p className="eyebrow">DELIVERY DETAILS</p>
          <div className="form-grid">
            <label>
              Name
              <input name="name" required placeholder="Your full name" />
            </label>
            <label>
              Phone
              <input name="phone" required placeholder="+91" />
            </label>
            <label>
              Email
              <input name="email" required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Address
              <input name="address" required placeholder="House, street, area" />
            </label>
            <label>
              City
              <input name="city" required placeholder="City" />
            </label>
            <label>
              State
              <input name="state" required placeholder="State" />
            </label>
            <label>
              Pincode
              <input name="pincode" required inputMode="numeric" placeholder="000000" />
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
