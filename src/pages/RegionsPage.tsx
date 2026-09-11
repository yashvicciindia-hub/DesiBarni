import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, MapPin, Sparkles, Utensils } from 'lucide-react';
import { products, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useReveal } from '@/hooks/useReveal';

type RegionDetail = {
  id: string;
  name: string;
  subtitle: string;
  pickles: string;
  description: string;
  tone: string;
  accentBg: string;
  oil: string;
  spices: string[];
  pairings: string[];
  heatLevel: number; // 1 to 5
  tangLevel: number; // 1 to 5
  aromaLevel: number; // 1 to 5
  mapDotClass: string;
};

const regionData: RegionDetail[] = [
  {
    id: 'NORTH',
    name: 'North India',
    subtitle: 'Bold, Oil-Rich & Sun-Cured Heritage',
    pickles: 'Punjabi Raw Mango · Mixed Vegetable Achhaar',
    description:
      'North Indian pickles are celebrated for their rich cold-pressed mustard oil, nigella seeds (kalonji), and sun-ripened raw mangoes. Aged slowly in clay barnis under the warm sun, these recipes deliver a deep, nostalgic warmth.',
    tone: '#b83a2f',
    accentBg: 'rgba(184, 58, 47, 0.12)',
    oil: 'Kacchi Ghani Mustard Oil',
    spices: ['Fennel (Saunf)', 'Kalonji', 'Fenugreek (Methi)', 'Yellow Mustard'],
    pairings: ['Stuffed Aloo Parathas', 'Amritsari Kulcha', 'Poori Aloo', 'Puri Bhaji'],
    heatLevel: 4,
    tangLevel: 4,
    aromaLevel: 5,
    mapDotClass: 'dot-1',
  },
  {
    id: 'WEST',
    name: 'West India',
    subtitle: 'Sweet-Spicy Harmonies & Coastal Zest',
    pickles: 'Gujarati Sweet Chundo · Maharashtrian Mango Pickle',
    description:
      'Western India balances fiery red chilli with golden jaggery and sugar. From Gujarati sun-grated Chundo to Maharashtrian lemon and mango achhaars, these pickles offer a complex sweet-savory profile.',
    tone: '#d99124',
    accentBg: 'rgba(217, 145, 36, 0.12)',
    oil: 'Filtered Groundnut Oil',
    spices: ['Guntur Red Chilli', 'Asafoetida (Hing)', 'Cumin', 'Jaggery'],
    pairings: ['Gujarati Thepla', 'Khakhra', 'Vada Pav', 'Dal Rice'],
    heatLevel: 3,
    tangLevel: 5,
    aromaLevel: 4,
    mapDotClass: 'dot-2',
  },
  {
    id: 'SOUTH',
    name: 'South India',
    subtitle: 'Intensely Spice-Forward & Aromatic',
    pickles: 'Andhra Avakaya · Kerala Pickle · Appemidi Tender Mango',
    description:
      'Southern pickle traditions are famed for fiery red chillies, gingelly (sesame) oil, roasted mustard, and garlic. Andhra Avakaya and Karnataka Appemidi stand as masterpieces of intense, aromatic pickle craft.',
    tone: '#66752a',
    accentBg: 'rgba(102, 117, 42, 0.12)',
    oil: 'Cold-Pressed Gingelly (Sesame) Oil',
    spices: ['Guntur Mirchi', 'Mustard Powder', 'Garlic Cloves', 'Fenugreek'],
    pairings: ['Curd Rice (Thayir Sadam)', 'Sambar Rice', 'Dosa & Idli', 'Steamed Rice with Ghee'],
    heatLevel: 5,
    tangLevel: 4,
    aromaLevel: 5,
    mapDotClass: 'dot-3',
  },
  {
    id: 'EAST',
    name: 'East India',
    subtitle: 'Mustard-Infused & Earthy Aromatics',
    pickles: 'Bengal Green Mango · Bihari Red Chilli Pickle',
    description:
      'Eastern traditions combine sharp mustard paste (kasundi style), Panch Phoron (five spice mix), and fragrant mustard oil to create raw, pungent pickles that cut through rich rice dishes.',
    tone: '#a86b35',
    accentBg: 'rgba(168, 107, 53, 0.12)',
    oil: 'Pungent Black Mustard Oil',
    spices: ['Panch Phoron', 'Mustard Paste', 'Turmeric', 'Green Chillies'],
    pairings: ['Luchi & Cholar Dal', 'Rice & Fish Curry', 'Khichdi', 'Jhalmuri'],
    heatLevel: 4,
    tangLevel: 4,
    aromaLevel: 4,
    mapDotClass: 'dot-4',
  },
  {
    id: 'NORTHEAST',
    name: 'Northeast India',
    subtitle: 'Smoky, Fermented & Specialty Spices',
    pickles: 'Bamboo Shoot Pickle · Naga Ghost Pepper (Bhut Jolokia)',
    description:
      'Northeast India showcases rare ingredients like fermented bamboo shoot, king chilli (Bhut Jolokia), and Sichuan pepper. These small-batch preparations offer vibrant heat and unmistakable smoky depth.',
    tone: '#8b6d4b',
    accentBg: 'rgba(139, 109, 75, 0.12)',
    oil: 'Light Sesame Oil / Infused Vegetable Oil',
    spices: ['Bhut Jolokia', 'Fermented Bamboo', 'Local Sichuan Pepper', 'Garlic'],
    pairings: ['Steamed Rice & Pork', 'Noodle Bowls', 'Smoky Meat Roasts', 'Sticky Rice'],
    heatLevel: 5,
    tangLevel: 3,
    aromaLevel: 5,
    mapDotClass: 'dot-1',
  },
];

function RatingMeter({ label, level, max = 5 }: { label: string; level: number; max?: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6, opacity: 0.9 }}>
        <span>{label}</span>
        <strong>{level} / {max}</strong>
      </div>
      <div style={{ height: 6, background: 'rgba(255, 255, 255, 0.15)', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(level / max) * 100}%`,
            background: 'currentColor',
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function RegionsPage({
  onQuickView,
  onAdded,
}: {
  onQuickView: (product: Product) => void;
  onAdded: (product: Product) => void;
}) {
  const [selectedId, setSelectedId] = useState('NORTH');
  useReveal();

  const activeRegion = regionData.find((r) => r.id === selectedId) || regionData[0];

  const regionalProducts = products.filter(
    (p) =>
      p.region.toUpperCase().includes(activeRegion.id) ||
      (activeRegion.id === 'NORTH' && p.region === 'North') ||
      (activeRegion.id === 'WEST' && p.region === 'West') ||
      (activeRegion.id === 'SOUTH' && p.region === 'South')
  );

  return (
    <main className="regions-page-redesign" style={{ minHeight: '100vh' }}>
      {/* Hero Header Banner */}
      <section className="section-dark noise" style={{ padding: '80px 40px 60px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* <p className="eyebrow reveal" style={{ color: '#d99124', letterSpacing: '2px' }}>
            REGIONAL FLAVOUR MAP OF INDIA
          </p> */}
          <h1 className="serif reveal delay-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.15, margin: '16px 0 20px' }}>
            Taste the Map of India.<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.9 }}>Five culinary zones. Hundreds of traditions.</em>
          </h1>
          <p className="reveal delay-2" style={{ maxWidth: 720, fontSize: '1.15rem', lineHeight: 1.7, opacity: 0.85 }}>
            India’s pickle heritage is as diverse as its geography. Discover how climate, local cold-pressed oils, and generational spice formulations define the unique flavor profile of each region.
          </p>

          {/* Quick Stats Badges */}
          <div className="reveal delay-3" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 36 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: 30, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin size={18} style={{ color: '#d99124' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>5 Distinct Regions</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: 30, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Flame size={18} style={{ color: '#b83a2f' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Artisanal Small-Batch Preserves</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: 30, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Sparkles size={18} style={{ color: '#66752a' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pure Cold-Pressed Oils</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Region Selector Section */}
      <section className="section" style={{ padding: '60px 40px' }} data-reveal>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Region Tabs Navigation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 40,
            }}
          >
            {regionData.map((reg) => {
              const isSelected = reg.id === selectedId;
              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedId(reg.id)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 12,
                    border: `2px solid ${isSelected ? reg.tone : 'color-mix(in srgb, currentColor 12%, transparent)'}`,
                    background: isSelected ? reg.tone : 'transparent',
                    color: isSelected ? '#ffffff' : 'inherit',
                    textAlign: 'left',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 8px 24px ${reg.tone}40` : 'none',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.8, display: 'block', fontWeight: 700 }}>
                    REGION
                  </span>
                  <strong style={{ fontSize: '1.1rem', display: 'block', marginTop: 2, fontFamily: 'Playfair Display, serif' }}>
                    {reg.name}
                  </strong>
                </button>
              );
            })}
          </div>

          {/* Active Region Detailed Spotlight Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              background: 'color-mix(in srgb, var(--surface, #ffffff) 92%, transparent)',
              padding: 40,
              borderRadius: 20,
              border: `1px solid ${activeRegion.tone}40`,
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            }}
          >
            {/* Left Column: Region Narrative */}
            <div>
              <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, background: activeRegion.accentBg, color: activeRegion.tone, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', marginBottom: 12 }}>
                {activeRegion.id} CULINARY PROFILE
              </div>
              <h2 className="serif" style={{ fontSize: '2.4rem', marginBottom: 12, color: activeRegion.tone }}>
                {activeRegion.name}
              </h2>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, opacity: 0.9 }}>
                {activeRegion.subtitle}
              </p>
              <p style={{ lineHeight: 1.7, opacity: 0.85, marginBottom: 24 }}>
                {activeRegion.description}
              </p>

              {/* Signature Oil & Spices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, borderTop: '1px solid color-mix(in srgb, currentColor 12%, transparent)', paddingTop: 20 }}>
                <div>
                  <small style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.7, textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                    TRADITIONAL OIL
                  </small>
                  <strong style={{ fontSize: '0.95rem', marginTop: 4, display: 'block' }}>
                    {activeRegion.oil}
                  </strong>
                </div>

                <div>
                  <small style={{ fontSize: '0.75rem', letterSpacing: '1px', opacity: 0.7, textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                    KEY SPICES
                  </small>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                    {activeRegion.spices.map((spice) => (
                      <span key={spice} style={{ fontSize: '0.78rem', background: 'color-mix(in srgb, currentColor 8%, transparent)', padding: '2px 8px', borderRadius: 4 }}>
                        {spice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Flavor Characteristics & Pairings */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div
                style={{
                  background: 'rgba(0,0,0,0.15)',
                  padding: 24,
                  borderRadius: 16,
                  color: '#ffffff',
                  backgroundColor: '#171511',
                }}
              >
                <h4 className="serif" style={{ fontSize: '1.2rem', marginBottom: 16, color: activeRegion.tone }}>
                  Flavor Characteristics
                </h4>

                <div style={{ color: activeRegion.tone }}>
                  <RatingMeter label="Heat & Spice Intensity" level={activeRegion.heatLevel} />
                  <RatingMeter label="Tanginess & Sour Notes" level={activeRegion.tangLevel} />
                  <RatingMeter label="Aroma & Oil Infusion" level={activeRegion.aromaLevel} />
                </div>
              </div>

              {/* Authentic Food Pairings */}
              <div style={{ marginTop: 24, padding: 20, borderRadius: 12, background: activeRegion.accentBg, border: `1px solid ${activeRegion.tone}30` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: activeRegion.tone, fontWeight: 700, fontSize: '0.85rem', marginBottom: 10, letterSpacing: '0.5px' }}>
                  <Utensils size={16} /> RECOMMENDED PAIRINGS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {activeRegion.pairings.map((pairing) => (
                    <span key={pairing} style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      • {pairing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Regional Pickles Grid */}
      <section className="section section-dark" style={{ padding: '80px 40px' }} data-reveal>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
            <div>
              <p className="eyebrow" style={{ color: activeRegion.tone }}>
                {activeRegion.name.toUpperCase()} SELECTION
              </p>
              <h2 className="serif" style={{ fontSize: '2.4rem' }}>
                Pickles of {activeRegion.name}
              </h2>
            </div>

            <Link to="/pickles" className="button" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              Explore Full Collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="featured-grid">
            {(regionalProducts.length > 0 ? regionalProducts : products.slice(0, 3)).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAdded={onAdded}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Callout Banner */}
      <section className="section" style={{ padding: '80px 40px', textAlign: 'center' }} data-reveal>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p className="eyebrow">PRESERVING CULINARY DIVERSITY</p>
          <h2 className="serif" style={{ fontSize: '2.5rem', margin: '16px 0 24px' }}>
            Every Barni carries a taste of home.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.85, marginBottom: 32 }}>
            Whether you crave the garlic-infused Avakaya of Andhra or the sweet sun-cured Chundo of Gujarat, Desi Barni bridges small-batch regional kitchens with modern tables nationwide.
          </p>
          <Link to="/pickles" className="button" style={{ display: 'inline-flex', textDecoration: 'none' }}>
            Shop Regional Pickles <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
