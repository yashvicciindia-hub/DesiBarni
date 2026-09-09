import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const journey = [
  'My 7-Product Pilot',
  'Document Learnings',
  'Identify Existing Pickle Businesses',
  'Assess Market Readiness',
  'Connect with Buyers',
  'Build Pan-India Market-Access Network',
];

const pilotTopics = [
  'Product formulation & costing',
  'Packaging design & supplier evaluation',
  'Shelf life & food safety testing',
  'Pricing strategy & margin analysis',
  'Customer response & feedback loops',
  'Retail acceptance & buyer requirements',
];

export default function JourneyPage() {
  useReveal();

  return (
    <main className="journey-page">
      <section id="journey" className="journey section" data-reveal style={{ paddingTop: 60 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">07 · OUR JOURNEY</p>
            <h1 className="serif">
              Starting small.
              <br />
              <em>Building for scale.</em>
            </h1>
          </div>
          <p className="journey-note">
            A six-stage journey from a personal pilot toward a wider ecosystem initiative.
          </p>
        </div>

        <div className="journey-track">
          {journey.map((item, index) => (
            <div className="journey-step" key={item}>
              <span className="journey-dot">0{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="pilot-grid">
          {pilotTopics.map((topic, index) => (
            <div className="pilot-item" key={topic}>
              <span>0{index + 1}</span>
              <p>{topic}</p>
              <Check size={15} />
            </div>
          ))}
        </div>
      </section>

      {/* Distribution Channels */}
      <section className="channels section section-dark" data-reveal style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">09 · WHERE WE GO NEXT</p>
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

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/market-access" className="button" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              Explore Full Market Access Strategy <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
