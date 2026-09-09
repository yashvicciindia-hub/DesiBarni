import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type Theme = 'light' | 'dark';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={`brand-mark ${compact ? 'compact' : ''}`} aria-label="Desi Barni home">
      <img src="/images/logo/Desi_barni.jpeg" alt="Desi Barni" />
    </Link>
  );
}

export default function Navbar({
  theme,
  onTheme,
  onCart,
}: {
  theme: Theme;
  onTheme: () => void;
  onCart: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Pickles', path: '/pickles' },
    { label: 'Market Access', path: '/market-access' },
    { label: 'Regional Flavours', path: '/regions' },
    { label: 'Our Journey', path: '/journey' },
  ];

  const handleSearchClick = () => {
    navigate('/pickles');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menu ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <Logo compact />
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn desktop-only"
            aria-label="Search pickles"
            onClick={handleSearchClick}
          >
            <Search size={18} />
          </button>
          <button className="icon-btn desktop-only" onClick={onTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="cart-trigger"
            onClick={onCart}
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag size={19} />
            <span>{itemCount}</span>
          </button>
          <button
            className="icon-btn mobile-only"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setMenu(false)}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              end={item.path === '/'}
            >
              {item.label}
              <ArrowRight size={16} />
            </NavLink>
          ))}
          <button onClick={onTheme}>
            {theme === 'dark' ? 'Switch to light' : 'Switch to dark'} <Sun size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
