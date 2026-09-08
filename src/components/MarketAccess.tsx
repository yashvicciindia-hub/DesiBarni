import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Circle, Factory, Globe2, PackageCheck, ShoppingBag, Store, Utensils } from 'lucide-react';
import { products } from '@/data/products';

type MarketAccessProps = { onExplore: () => void };

type Region = { name: string; pickles: string; detail: string; tone: string };
type Layer = { name: string; detail: string; items: string[]; icon: typeof Factory };

const regions: Region[] = [
  { name: 'NORTH', pickles: 'Punjabi Mango · Mixed Vegetable', detail: 'Bold, oil-rich, mass-market familiar.', tone: '#b83a2f' },
  { name: 'WEST', pickles: 'Gujarati Chundo · Maharashtrian Pickles', detail: 'Sweet-spicy with urban appeal.', tone: '#d99124' },
  { name: 'SOUTH', pickles: 'Andhra Avakaya · Kerala Pickles · Karnataka Appemidi', detail: 'Intensely flavoured and export-ready.', tone: '#66752a' },
  { name: 'EAST', pickles: 'Regional Mango & Chilli Pickles', detail: 'Underrepresented in national retail.', tone: '#a86b35' },
  { name: 'NORTHEAST', pickles: 'Bamboo Shoot & Regional Chilli Pickles', detail: 'Unique and specialty-friendly.', tone: '#8b6d4b' },
];

const layers: Layer[] = [
  { name: 'MICRO PRODUCERS', detail: 'The kitchens where regional identity begins.', items: ['Home businesses', 'Women entrepreneurs', 'SHGs'], icon: Factory },
  { name: 'SMALL ENTERPRISES', detail: 'Local capability ready for a wider proposition.', items: ['MSMEs', 'Local manufacturers', 'FPO-linked businesses'], icon: PackageCheck },
  { name: 'DOMESTIC MARKET', detail: 'Everyday and emerging routes to Indian tables.', items: ['Retail', 'Modern trade', 'D2C', 'E-commerce'], icon: Store },
  { name: 'INSTITUTIONAL MARKET', detail: 'Professional kitchens and organised demand.', items: ['Hotels', 'Restaurants', 'Caterers', 'Corporates'], icon: Utensils },
  { name: 'EXPORT MARKET', detail: 'The wider world of Indian food discovery.', items: ['Importers', 'Distributors', 'Ethnic retailers', 'Diaspora networks'], icon: Globe2 },
];

const valueSteps = [
  ['PREPARE PRODUCERS', 'Understand the product, production process, capabilities, costs and readiness of regional pickle businesses.'],
  ['PACKAGE PRODUCT', 'Improve packaging, specifications and presentation so products can meet market requirements.'],
  ['CONNECT BUYERS', 'Create connections with retail, institutional, e-commerce, distributor and export buyers.'],
  ['POSITION BRAND', 'Turn regional identity and flavour into a stronger market proposition.'],
  ['REPEAT', 'Use customer response, buyer requirements and market feedback to improve the model.'],
  ['SCALE', 'Build a replicable market-access model that can expand across producers and regions.'],
];

const buyers = [
  ['RETAIL', 'Kirana and organized stores', ShoppingBag],
  ['B2B', 'Hotels, restaurants and caterers', Utensils],
  ['E-COMMERCE', 'Marketplaces and D2C', Store],
  ['EXPORT', 'Importers and diaspora', Globe2],
] as const;

const pathway = [
  ['01', 'IDENTIFY PRODUCERS', 'Find regional pickle businesses with a story and a product to share.'],
  ['02', 'VERIFY QUALITY', 'Understand product, process, capability, costs and readiness.'],
  ['03', 'STANDARDIZE SPECS', 'Make packaging and specifications ready for market requirements.'],
  ['04', 'REACH BUYERS', 'Connect the right products with domestic and international demand.'],
];

const roadmap = [
  ['01', 'MY 7-PRODUCT PILOT', 'Run a micro business for firsthand insight.'],
  ['02', 'DOCUMENT LEARNINGS', 'Capture product, pricing, packaging and buyer insights.'],
  ['03', 'IDENTIFY EXISTING PICKLE BUSINESSES', 'Map micro, small and MSME producers across India.'],
  ['04', 'ASSESS MARKET READINESS', 'Review compliance, capacity, pricing and buyers.'],
  ['05', 'CONNECT WITH BUYERS', 'Make introductions to retail, institutional, e-commerce and export buyers.'],
  ['06', 'BUILD PAN-INDIA MARKET-ACCESS NETWORK', 'Scale the model nationwide across producers.'],
];

const pilotTests = [
  'PRODUCT FORMULATION & COSTING', 'PACKAGING DESIGN & SUPPLIER EVALUATION', 'SHELF LIFE & FOOD SAFETY TESTING', 'PRICING STRATEGY & MARGIN ANALYSIS',
  'CUSTOMER RESPONSE & FEEDBACK LOOPS', 'RETAIL ACCEPTANCE & BUYER REQUIREMENTS', 'SCALABILITY ASSESSMENT', 'DOCUMENTED OPERATIONAL INTELLIGENCE',
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`ma-reveal ${className}`}>{children}</div>;
}

function SectionIntro({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: React.ReactNode; copy?: string }) {
  return <div className="ma-section-intro"><div className="ma-section-number">{number} <span>{eyebrow}</span></div><div><h2 className="serif">{title}</h2>{copy && <p>{copy}</p>}</div></div>;
}

function MarketAccessHero({ onExplore }: MarketAccessProps) {
  return <section className="ma-hero hero-grid noise"><div className="ma-hero-copy"><p className="eyebrow ma-reveal">MARKET ACCESS</p><h1 className="serif ma-reveal ma-delay-1">From local taste<br /><em>to national market.</em></h1><p className="ma-hero-statement ma-reveal ma-delay-2">India has the pickles.<br />The challenge is market access.</p><p className="ma-hero-body ma-reveal ma-delay-3">Desi Barni is building a structured pathway that helps small and regional pickle businesses prepare, position and connect with domestic and international buyers.</p><div className="ma-hero-actions ma-reveal ma-delay-3"><button className="button" onClick={onExplore}>Explore the pathway <ArrowDown size={16} /></button><span>BUILDING THE BRIDGE</span></div></div><div className="ma-bridge" aria-label="Local producers connected to market buyers"><div className="ma-bridge-line" /><div className="ma-node ma-node-producer"><span className="ma-node-icon">◉</span><small>LOCAL</small><strong>PRODUCER</strong></div><div className="ma-node ma-node-core"><span>DESI<br />BARNI</span></div><div className="ma-node ma-node-market"><small>MARKET</small><strong>BUYERS</strong><div className="ma-buyer-list"><span>RETAIL</span><span>B2B</span><span>E-COMMERCE</span><span>EXPORT</span></div></div></div><div className="ma-hero-foot"><span>01 — THE OPPORTUNITY</span><span>REGIONAL TASTE · STRUCTURED ACCESS</span></div></section>;
}

function MarketAccessGap() {
  const [bridged, setBridged] = useState(false);
  const have = ['Traditional recipes & regional identity', 'Local raw materials', 'Production skills & quality control', 'Regional customer loyalty'];
  const lack = ['Professional branding & packaging', 'Buyer discovery', 'Scale & consistency', 'Digital visibility & e-commerce', 'Organized retail connections', 'Institutional & export networks'];
  return <section className="ma-section ma-gap-section"><Reveal><SectionIntro number="01" eyebrow="THE MARKET ACCESS GAP" title={<>India has the pickles.<br /><em>The market access is fragmented.</em></>} copy="Good Product ≠ Market Access. The challenge is the gap between what small producers make and what buyers can discover and procure." /></Reveal><div className={`ma-gap-visual ${bridged ? 'is-bridged' : ''}`}><div className="ma-gap-column ma-have"><p className="eyebrow">WHAT SMALL PRODUCERS HAVE</p>{have.map((item) => <div key={item}><Check size={15} />{item}</div>)}</div><div className="ma-gap-center"><span>LOCAL<br />PRODUCER</span><div className="ma-gap-core"><strong>{bridged ? 'BRIDGE' : 'MARKET ACCESS GAP'}</strong><small>{bridged ? 'DESI BARNI PATHWAY' : 'THE MISSING MIDDLE'}</small></div><span>NATIONAL +<br />INTERNATIONAL BUYER</span><button className="ma-bridge-toggle" onClick={() => setBridged(!bridged)}>{bridged ? 'Reset gap' : 'Build the bridge'} <ArrowRight size={14} /></button></div><div className="ma-gap-column ma-lack"><p className="eyebrow">WHAT THEY LACK</p>{lack.map((item, index) => <div key={item} style={{ '--item-delay': `${index * 70}ms` } as React.CSSProperties}><span>0{index + 1}</span>{item}</div>)}</div></div></section>;
}

function Ecosystem() {
  const [active, setActive] = useState(0); const layer = layers[active]; const Icon = layer.icon;
  return <section className="ma-section ma-ecosystem section-dark"><Reveal><SectionIntro number="02" eyebrow="THE ECOSYSTEM" title={<>A large and diverse ecosystem.<br /><em>Highly fragmented.</em></>} copy="Five interconnected layers create both complexity and opportunity." /></Reveal><div className="ma-ecosystem-layout"><div className="ma-layer-list">{layers.map((item, index) => { const LayerIcon = item.icon; return <button key={item.name} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>0{index + 1}</span><LayerIcon size={18} /><strong>{item.name}</strong><ArrowRight size={15} /></button>; })}</div><div className="ma-ecosystem-display"><div className="ma-ecosystem-orbit"><div className="ma-orbit-line orbit-one" /><div className="ma-orbit-line orbit-two" /><div className="ma-ecosystem-core">MARKET<br />ACCESS</div><div className="ma-orbit-dot dot-a">TASTE</div><div className="ma-orbit-dot dot-b">TRUST</div><div className="ma-orbit-dot dot-c">DEMAND</div></div><div className="ma-layer-detail"><Icon size={22} /><p className="eyebrow">{layer.name}</p><h3 className="serif">{layer.detail}</h3><div>{layer.items.map((item) => <span key={item}>{item}</span>)}</div></div></div></div></section>;
}

function ValueCreation() {
  const [active, setActive] = useState(0); const step = valueSteps[active];
  return <section id="pathway" className="ma-section ma-value"><Reveal><SectionIntro number="03" eyebrow="HOW VALUE IS CREATED" title={<>Prepare.<br /><em>Connect. Sell. Repeat. Scale.</em></>} copy="A market-access model that learns from real demand and turns regional identity into a stronger proposition." /></Reveal><div className="ma-process"><div className="ma-process-tabs">{valueSteps.map((item, index) => <button key={item[0]} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>0{index + 1}</span>{item[0]}</button>)}</div><div className="ma-process-progress"><i style={{ width: `${((active + 1) / valueSteps.length) * 100}%` }} /></div><div className="ma-process-detail"><span className="ma-process-number">0{active + 1}</span><div><p className="eyebrow">{active < 4 ? `STAGE 0${active + 1}` : 'CONTINUOUS LEARNING'}</p><h3 className="serif">{step[0]}</h3><p>{step[1]}</p></div><ArrowUpRight size={28} /></div></div></section>;
}

function DemandSection() {
  return <section className="ma-section section-dark ma-demand"><Reveal><SectionIntro number="04" eyebrow="REAL MARKET DEMAND" title={<>Support matters most<br /><em>when it leads to demand.</em></>} /></Reveal><div className="ma-demand-grid"><div className="ma-demand-pillar"><span>01</span><h3 className="serif">ENTERPRISE<br />DEVELOPMENT</h3><p>Finance · Infrastructure · Training · Branding · Facilities</p></div><div className="ma-demand-core">REAL<br /><em>MARKET DEMAND</em><span className="ma-demand-path path-left" /><span className="ma-demand-path path-right" /></div><div className="ma-demand-pillar"><span>02</span><h3 className="serif">MARKET<br />ACCESS</h3><p>Buyer discovery · Industry links · Trade events · Networking</p></div><div className="ma-demand-pillar ma-demand-pillar-bottom"><span>03</span><h3 className="serif">CORE<br />MARKET</h3><p>Retail · Institutional · E-commerce · Exporters · Distributors</p></div></div></section>;
}

function RegionalFlavours() {
  const [active, setActive] = useState(0); const region = regions[active];
  return <section className="ma-section ma-regional"><Reveal><SectionIntro number="05" eyebrow="REGIONAL FLAVOURS AS OPPORTUNITY" title={<>One country.<br /><em>Hundreds of regional tastes.</em></>} copy="India's regional pickle diversity is a commercial differentiator that remains largely unexploited at the national and export level." /></Reveal><div className="ma-regional-layout"><div className="ma-india-visual"><div className="ma-india-shape"><span>INDIA</span>{regions.map((item, index) => <button key={item.name} className={`ma-region-pin pin-${index} ${active === index ? 'active' : ''}`} style={{ '--pin-tone': item.tone } as React.CSSProperties} onClick={() => setActive(index)} aria-label={`Show ${item.name} region`} />)}</div><p>REGIONAL IDENTITY<br />BECOMES A PREMIUM PROPOSITION</p></div><div className="ma-region-cards">{regions.map((item, index) => <button key={item.name} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>{item.name}</span><strong>{item.pickles}</strong><small>{item.detail}</small></button>)}<div className="ma-region-detail" style={{ borderColor: region.tone }}><p className="eyebrow">{region.name} · MARKET OPPORTUNITY</p><h3 className="serif">{region.detail}</h3><p>{region.pickles}</p></div></div></div></section>;
}

function BuyerChannels() {
  return <section className="ma-section section-dark ma-buyers"><Reveal><SectionIntro number="06" eyebrow="WHO WE CONNECT" title={<>Connecting small producers<br /><em>with real demand.</em></>} /></Reveal><div className="ma-buyer-grid">{buyers.map(([name, detail, Icon], index) => <article className="ma-buyer-card" key={name}><span>0{index + 1}</span><Icon size={25} /><h3 className="serif">{name}</h3><p>{detail}</p><ArrowUpRight /></article>)}</div></section>;
}

function MarketReadyPath() {
  const [active, setActive] = useState(0); const item = pathway[active];
  return <section className="ma-section ma-path"><Reveal><SectionIntro number="07" eyebrow="THE MARKET-READY PATH" title={<>From local producer<br /><em>to market-ready enterprise.</em></>} copy="The proposed market-access model creates a structured pathway that connects small pickle businesses with national and international buyers." /></Reveal><div className="ma-pathway">{pathway.map((step, index) => <button key={step[1]} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>{step[0]}</span><strong>{step[1]}</strong><small>{active === index ? step[2] : 'Explore stage'}</small></button>)}</div><div className="ma-pathway-note"><Circle size={12} /> {item[2]}</div></section>;
}

function Roadmap() {
  const [active, setActive] = useState(0); const item = roadmap[active];
  return <section id="journey" className="ma-section section-dark ma-roadmap"><Reveal><SectionIntro number="08" eyebrow="THE SIX-STAGE JOURNEY" title={<>From one pilot<br /><em>to pan-India.</em></>} copy="A six-stage roadmap from a personal pilot to a scalable ecosystem initiative." /></Reveal><div className="ma-roadmap-track"><div className="ma-roadmap-line"><i style={{ width: `${(active / (roadmap.length - 1)) * 100}%` }} /></div>{roadmap.map((step, index) => <button key={step[1]} className={active === index ? 'active' : ''} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)}><span>{step[0]}</span><strong>{step[1]}</strong></button>)}</div><div className="ma-roadmap-detail"><span className="ma-process-number">{item[0]}</span><div><p className="eyebrow">ROADMAP STAGE</p><h3 className="serif">{item[1]}</h3><p>{item[2]}</p></div></div></section>;
}

function PilotSection() {
  const [activeTest, setActiveTest] = useState(0);
  return <section className="ma-section ma-pilot"><Reveal><SectionIntro number="09" eyebrow="THE 7-PRODUCT PILOT" title={<>Starting small.<br /><em>Building a scalable model.</em></>} copy="The 7-product pilot is a live R&D laboratory — not a commercial launch. It tests the requirements of a scalable ecosystem model." /></Reveal><div className="ma-pilot-products">{products.map((product) => <span key={product.id}>{product.shortName}</span>)}</div><div className="ma-pilot-note"><PackageCheck size={23} /><div><strong>LIVE R&D LABORATORY</strong><p>Product · Pricing · Packaging · Customer · Market-access requirements</p></div></div><div className="ma-test-grid"><p className="eyebrow">10 · WHAT THE PILOT TESTS</p>{pilotTests.map((test, index) => <button key={test} className={activeTest === index ? 'active' : ''} onMouseEnter={() => setActiveTest(index)} onFocus={() => setActiveTest(index)} onClick={() => setActiveTest(index)}><span>0{index + 1}</span><strong>{test}</strong><ArrowRight size={15} /></button>)}</div></section>;
}

function Phases() {
  return <section className="ma-section section-dark ma-phases"><Reveal><SectionIntro number="11" eyebrow="MARKET ACCESS PHASES" title={<>A proposed path<br /><em>from pilot to network.</em></>} /></Reveal><p className="ma-proposed-label">PROPOSED PILOT TARGETS — NOT CURRENT ACHIEVEMENTS</p><div className="ma-phase-grid"><article><span>PHASE 01</span><h3 className="serif">PILOT</h3><strong>0–6 MONTHS</strong><p>7 products<br />Testing<br />Costing<br />Packaging</p></article><article><span>PHASE 02</span><h3 className="serif">MARKET-ACCESS<br />PILOT</h3><strong>6–18 MONTHS</strong><p>25–50 businesses<br />Producer identification<br />Database building<br />Buyer trials</p></article><article><span>PHASE 03</span><h3 className="serif">PAN-INDIA<br />NETWORK</h3><strong>18–36 MONTHS</strong><p>500+ producers<br />Multi-state network<br />National buyers<br />Export-ready pool</p></article></div></section>;
}

export default function MarketAccess({ onExplore }: MarketAccessProps) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, []);
  return <main className="market-access"><MarketAccessHero onExplore={onExplore} /><MarketAccessGap /><Ecosystem /><ValueCreation /><DemandSection /><RegionalFlavours /><BuyerChannels /><MarketReadyPath /><Roadmap /><PilotSection /><Phases /><section className="ma-section section-dark ma-final"><div><p className="eyebrow">12 · THE NEXT CHAPTER</p><h2 className="serif">The pilot creates the proof.<br /><em>The model creates scale.</em></h2><p>From regional producers to market-ready enterprises, Desi Barni is building pathways to buyers across India and beyond.</p><div className="ma-final-actions"><button className="button" onClick={onExplore}>Explore our pickles <ArrowRight size={16} /></button><a className="button button-secondary" href="#journey">Our journey <ArrowRight size={16} /></a></div></div><div className="ma-final-mark"><span>देस</span><small>FROM LOCAL<br />TO NATIONAL</small></div></section></main>;
}
