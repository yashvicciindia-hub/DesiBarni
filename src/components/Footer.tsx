import { Link } from 'react-router-dom';
import { CircleUserRound, Instagram, Moon, Sun, Youtube } from 'lucide-react';
import { Logo } from './Navbar';

type Theme = 'light' | 'dark';

export default function Footer({ theme, onTheme }: { theme: Theme; onTheme: () => void }) {
  return (
    <footer id="footer" className="footer section-dark">
      <div className="footer-top">
        <div>
          <Logo />
          <p>
            Regional tastes.
            <br />
            Modern marketplace.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <Link to="/">Home</Link>
            <Link to="/pickles">Our Pickles</Link>
            <Link to="/market-access">Market Access</Link>
            <Link to="/regions">Regional Flavours</Link>
            <Link to="/journey">Our Journey</Link>
          </div>
          <div>
            <span>Help</span>
            <a href="#footer">Shipping</a>
            <a href="#footer">Returns</a>
            <a href="#footer">FAQs</a>
            <a href="#footer">Contact</a>
          </div>
          <div>
            <span>Follow along</span>
            <a href="#footer">
              <Instagram size={16} /> Instagram
            </a>
            <a href="#footer">
              <Youtube size={16} /> YouTube
            </a>
            <a href="#footer">
              <CircleUserRound size={16} /> Journal
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Desi Barni</span>
        <button onClick={onTheme}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}{' '}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <span>Made with patience & masala</span>
      </div>
    </footer>
  );
}
