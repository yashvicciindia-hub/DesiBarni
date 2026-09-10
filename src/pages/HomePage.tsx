import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

import Button from '@/components/Button';
import { useReveal } from '@/hooks/useReveal';

type Region = { name: string; detail: string; pickles: string; tone: string };

const regions: Region[] = [
  { name: 'NORTH', detail: 'Bold, oil-rich and familiar.', pickles: 'Punjabi Mango · Mixed Vegetable', tone: '#b83a2f' },
  { name: 'WEST', detail: 'Sweet-spicy with urban appeal.', pickles: 'Gujarati Chundo · Maharashtrian Pickles', tone: '#d99124' },
  { name: 'SOUTH', detail: 'Intensely flavoured and fragrant.', pickles: 'Andhra Avakaya · Kerala Pickles · Appemidi', tone: '#66752a' },
  { name: 'EAST', detail: 'Distinctive regional mango and chilli traditions.', pickles: 'Mango · Chilli Pickles', tone: '#a86b35' },
  { name: 'NORTHEAST', detail: 'Unique, bright and specialty-friendly.', pickles: 'Bamboo Shoot · Regional Chilli Pickles', tone: '#8b6d4b' },
];

const stages = ['PREPARE', 'PACKAGE', 'CONNECT', 'POSITION', 'REPEAT', 'SCALE'];

export default function HomePage({
  onQuickView,
  onAdded,
}: {
  onQuickView: (product: Product) => void;
  onAdded: (product: Product) => void;
}) {
  const [region, setRegion] = useState(regions[0]);
  const [stage, setStage] = useState(0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const featured = products.slice(0, 4);
  const filtered = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.ingredients.join(' ')} ${product.flavourProfile}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [query]
  );

  useReveal();

  return (
    <main id="top">
      {/* Hero Section */}
      <section className="hero hero-grid noise">
        <div className="hero-product reveal delay-2">
          <img
            src="/images/logo/header.png"
            alt="Desi Barni mango pickle with regional ingredients"
            className="hero-header-image"
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow reveal">ONE COUNTRY · HUNDREDS OF REGIONAL TASTES</p>
          <h1 className="serif reveal delay-1">
            From local taste
            <br />
            <em>to every table.</em>
          </h1>
          <p className="hero-lede reveal delay-2">
            India has hundreds of regional pickle traditions. Desi Barni brings those flavours closer to modern India.
          </p>
          <div className="hero-actions reveal delay-3">
            <Button onClick={() => navigate('/pickles')}>Explore the pickles</Button>
            <Link className="story-link" to="/regions">
              Regional flavours <ArrowRight size={15} />
            </Link>
          </div>
        </div>
        <span className="ingredient-float float-a">MANGO</span>
        <span className="ingredient-float float-b">MIRCHI</span>
        <span className="ingredient-float float-c">नमक</span>
        <div className="hero-meta">
          <span>01 — 07</span>
          <span>Small batches, big stories</span>
        </div>
      </section>

      {/* Image Band */}
      <section className="image-band">
        <img
          src="https://images.pexels.com/photos/7812134/pexels-photo-7812134.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Traditional Indian mango pickle in a rustic jar"
          loading="lazy"
        />
        <div className="image-band-overlay">
          <p data-reveal>
            Every jar carries <em>a story</em> from a kitchen you may never have visited.
          </p>
        </div>
      </section>

      {/* Idea / Manifesto */}
      <section className="manifesto section-dark" data-reveal>
        <div className="section-label">
          <span>01</span>
          <span>THE IDEA</span>
        </div>
        <div className="manifesto-copy">
          <p className="eyebrow">A TASTE OF PLACE</p>
          <h2 className="serif">
            One country.
            <br />
            <em>Hundreds of regional tastes.</em>
          </h2>
          <p>
            Every region has its own way of making a pickle. We are here to make those stories easier to discover, share and bring home.
          </p>
          <Link className="text-link" to="/regions">
            Explore regional flavours <ArrowRight size={15} />
          </Link>
        </div>
        <div className="manifesto-mark">
          <span>देस</span>
          <small>
            REGIONAL
            <br />
            FLAVOURS
          </small>
        </div>
      </section>

      {/* Featured Collection */}
      <section id="collection" className="section collection" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">02 · THE COLLECTION</p>
            <h2 className="serif">
              The Desi Barni
              <br />
              <em>collection.</em>
            </h2>
          </div>
          <div className="collection-intro">
            <p>Seven flavours. Seven stories. One love for India's pickle traditions.</p>
            <div className="search-box">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search mango, chilli..."
                aria-label="Search pickles"
              />
            </div>
          </div>
        </div>
        <div className="featured-grid">
          {(query ? filtered : featured).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAdded={onAdded}
            />
          ))}
        </div>
        {!query && (
          <Link className="center-link" to="/pickles">
            View all seven flavours <ArrowRight size={16} />
          </Link>
        )}
      </section>

      {/* Regional Flavours Preview */}
      <section id="regions" className="regions section-dark" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">03 · REGIONAL FLAVOURS</p>
            <h2 className="serif">
              Taste the
              <br />
              <em>map of India.</em>
            </h2>
          </div>
          <p className="regions-note">The best pickle is often the one that takes you somewhere.</p>
        </div>
        <div className="region-layout">
          <div className="india-shape">
            <div className="india-outline">
              <span>INDIA</span>
              <i className="map-dot dot-1" />
              <i className="map-dot dot-2" />
              <i className="map-dot dot-3" />
              <i className="map-dot dot-4" />
            </div>
            <span className="map-caption">
              A COUNTRY OF
              <br />
              MANY TABLES
            </span>
          </div>
          <div className="region-list">
            {regions.map((item) => (
              <button
                key={item.name}
                className={`region-row ${region.name === item.name ? 'active' : ''}`}
                onClick={() => setRegion(item)}
              >
                <span>{item.name}</span>
                <strong>{item.detail}</strong>
                <ArrowRight size={17} />
              </button>
            ))}
            <div className="region-detail" style={{ borderColor: region.tone }}>
              <p className="eyebrow">{region.name}</p>
              <h3 className="serif">{region.pickles}</h3>
              <p>{region.detail} Regional traditions, waiting to be discovered.</p>
              <Link className="text-link" style={{ marginTop: 12 }} to="/regions">
                Explore all regions <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Network */}
      <section className="ecosystem section" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">04 · THE NETWORK</p>
            <h2 className="serif">
              More than a pickle.
              <br />
              <em>A network of taste.</em>
            </h2>
          </div>
          <p className="ecosystem-note">
            From home businesses and women entrepreneurs to retailers, restaurants and diaspora networks — regional taste has many hands behind it.
          </p>
        </div>
        <div className="network">
          <div className="network-core">
            <img src="/images/logo/Desi_barni.jpeg" alt="Desi Barni" />
          </div>
          {['PRODUCERS', 'HOME KITCHENS', 'RETAIL', 'D2C', 'RESTAURANTS', 'EXPORT'].map((node, index) => (
            <div key={node} className={`network-node node-${index}`}>
              <span>{node}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="process section-dark" data-reveal>
        <div className="section-label">
          <span>05</span>
          <span>MARKET ACCESS</span>
        </div>
        <div className="section-head">
          <div>
            <p className="eyebrow">THE WAY FORWARD</p>
            <h2 className="serif">
              Prepare. Connect.
              <br />
              <em>Grow together.</em>
            </h2>
          </div>
          <p className="process-note">A thoughtful path from regional product to a stronger market presence.</p>
        </div>
        <div className="stage-tabs">
          {stages.map((item, index) => (
            <button
              key={item}
              className={stage === index ? 'active' : ''}
              onClick={() => setStage(index)}
            >
              <span>0{index + 1}</span>
              {item}
            </button>
          ))}
        </div>
        <div className="stage-panel">
          <span className="stage-number">0{stage + 1}</span>
          <div>
            <h3 className="serif">{stages[stage]}</h3>
            <p>
              {[
                'Develop product and process with care.',
                'Packaging, specifications and positioning for a modern shelf.',
                'Connect with retail, institutional, e-commerce and export buyers.',
                'Build a stronger regional product proposition.',
                'Learn from customer response and feed it back into the work.',
                'Build a scalable market-access network.',
              ][stage]}
            </p>
          </div>
          <ArrowRight size={30} />
        </div>
      </section>

      {/* The Taste — Section 06 */}
      <section className="taste-section" data-reveal>
        {/* Full-bleed photo */}
        <img
          className="taste-bg-img"
          src="/images/logo/taste_bg.jpg"
          alt="Desi Barni six pickle jars — Mango, Red Chilli, Garlic, Green Chilli, Lime, Ginger — arranged on a rustic kitchen table"
          loading="lazy"
        />
        {/* Gradient overlay — dark on left, transparent on right */}
        <div className="taste-overlay" />

        {/* Text panel */}
        <div className="taste-copy">
          <p className="taste-label">06 — THE TASTE</p>
          <h2 className="serif taste-heading">
            Seven<br />flavours.<br />
            <em>Countless<br />memories.</em>
          </h2>
          <p className="taste-body">
            Some tastes arrive with a little heat. Others arrive with a familiar kitchen, a summer afternoon, a table full of people.
          </p>
          <Link className="text-link" to="/pickles">
            Meet the collection <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Channels Section */}
      <section className="channels section" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">07 · WHERE WE GO NEXT</p>
            <h2 className="serif">
              From our barni
              <br />
              <em>to more tables.</em>
            </h2>
          </div>
          <p className="channels-note">
            The next chapter is about making regional taste easier to find, wherever people gather around food.
          </p>
        </div>
        <div className="channel-grid">
          {[
            ['RETAIL', 'Kirana and organised stores'],
            ['B2B', 'Hotels, restaurants and caterers'],
            ['E-COMMERCE', 'Marketplaces and D2C'],
            ['EXPORT', 'Importers and diaspora'],
          ].map(([title, copy], index) => (
            <div className="channel-card" key={title}>
              <span>0{index + 1}</span>
              <h3 className="serif">{title}</h3>
              <p>{copy}</p>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta section-dark" data-reveal>
        <div>
          <p className="eyebrow">A LITTLE INDIA, FOR YOUR TABLE</p>
          <h2 className="serif">
            Bring a little India
            <br />
            <em>to your table.</em>
          </h2>
          <p>Discover the flavours that travel from regional kitchens to modern tables.</p>
          <Button onClick={() => navigate('/pickles')}>Explore the pickles</Button>
        </div>
        <div className="final-jar">
          <img src="/images/logo/PickleFlav.png" alt="Desi Barni pickle" />
        </div>
      </section>

      {/* Market Access Teaser Banner */}
      <section className="market-access-teaser section" data-reveal style={{ background: '#171511', color: '#f4e6c8', padding: '60px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="eyebrow" style={{ color: '#d99124' }}>DESI BARNI INITIATIVE</p>
        <h2 className="serif" style={{ fontSize: '2.4rem', margin: '16px 0' }}>Explore Market Access Pathway</h2>
        <p style={{ maxWidth: 640, margin: '0 auto 24px', opacity: 0.85, lineHeight: 1.6 }}>
          Discover how Desi Barni builds a structured pathway connecting local small-scale pickle producers with national and international market demand.
        </p>
        <Link to="/market-access" className="button" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          View Full Market Access Page <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
