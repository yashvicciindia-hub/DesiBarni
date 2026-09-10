import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { CartProvider } from '@/context/CartContext';
import type { Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickView from '@/components/QuickView';
import ScrollToTop from '@/components/ScrollToTop';

import HomePage from '@/pages/HomePage';
import PicklesPage from '@/pages/PicklesPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import RegionsPage from '@/pages/RegionsPage';
import JourneyPage from '@/pages/JourneyPage';
import MarketAccessPage from '@/pages/MarketAccessPage';
import CheckoutPage from '@/pages/CheckoutPage';

type Theme = 'light' | 'dark';

function AppContent() {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem('desi-barni-theme') as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  const [toast, setToast] = useState('');

  const changeTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('desi-barni-theme', theme);
  }, [theme]);

  const added = (product: Product) => {
    setToast(`${product.shortName} added to your Barni`);
    window.setTimeout(() => setToast(''), 2600);
  };

  const location = useLocation();
  const isRegionsPage = location.pathname === '/regions';

  return (
    <div className={`${theme === 'dark' ? 'dark-page' : 'light-page'} app${isRegionsPage ? ' regions-page' : ''}`}>
      <ScrollToTop />
      <Navbar theme={theme} onTheme={changeTheme} onCart={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage onQuickView={setQuick} onAdded={added} />} />
        <Route path="/pickles" element={<PicklesPage onQuickView={setQuick} onAdded={added} />} />
        <Route
          path="/product/:slug"
          element={<ProductDetailPage onAdded={added} onQuickView={setQuick} />}
        />
        <Route path="/regions" element={<RegionsPage onQuickView={setQuick} onAdded={added} />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/market-access" element={<MarketAccessPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<HomePage onQuickView={setQuick} onAdded={added} />} />
      </Routes>

      <Footer theme={theme} onTheme={changeTheme} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <QuickView product={quick} onClose={() => setQuick(null)} onAdded={added} />

      {toast && (
        <div className="toast">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}
