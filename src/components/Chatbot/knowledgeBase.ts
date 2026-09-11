import { products, type Product } from '@/data/products';

export interface ChatbotAction {
  label: string;
  path: string;
}

export interface ChatbotResponse {
  text: string;
  actions?: ChatbotAction[];
  suggestions?: string[];
}

export const BRAND_INFO = {
  name: 'DesiBarni',
  tagline: 'Regional tastes. Modern marketplace.',
  manifesto:
    'One country. Hundreds of regional tastes. Every region in India has its own way of making a pickle. DesiBarni is dedicated to bringing those authentic flavours from regional kitchens to modern dining tables.',
  craft:
    'Our pickles are crafted in small batches using traditional sun-curing, generational spice formulations, and pure cold-pressed oils—such as Kacchi Ghani Mustard oil in the North and Cold-Pressed Gingelly (sesame) oil in the South.',
  packaging:
    'Every DesiBarni preserve comes packed in a sealed 250g traditional glass jar (barni) to preserve natural flavor, aroma, and shelf life without synthetic additives.',
  regions: [
    {
      id: 'NORTH',
      name: 'North India',
      pickles: 'Punjabi Raw Mango · Mixed Vegetable Achhaar',
      oil: 'Kacchi Ghani Mustard Oil',
      spices: 'Fennel (Saunf), Kalonji, Fenugreek (Methi), Yellow Mustard',
      pairings: 'Stuffed Aloo Parathas, Amritsari Kulcha, Poori Aloo',
      profile: 'Bold, oil-rich, sun-cured warmth',
    },
    {
      id: 'WEST',
      name: 'West India',
      pickles: 'Gujarati Sweet Chundo · Maharashtrian Mango Pickle',
      oil: 'Filtered Groundnut Oil',
      spices: 'Guntur Red Chilli, Asafoetida (Hing), Cumin, Jaggery',
      pairings: 'Gujarati Thepla, Khakhra, Vada Pav, Dal Rice',
      profile: 'Sweet-spicy harmonies and coastal zest',
    },
    {
      id: 'SOUTH',
      name: 'South India',
      pickles: 'Andhra Avakaya · Kerala Pickles · Karnataka Appemidi',
      oil: 'Cold-Pressed Gingelly (Sesame) Oil',
      spices: 'Guntur Mirchi, Mustard Powder, Garlic Cloves, Fenugreek',
      pairings: 'Curd Rice (Thayir Sadam), Sambar Rice, Dosa & Idli',
      profile: 'Intensely spice-forward, fiery, and aromatic',
    },
    {
      id: 'EAST',
      name: 'East India',
      pickles: 'Bengal Green Mango · Bihari Red Chilli Pickle',
      oil: 'Pungent Black Mustard Oil',
      spices: 'Panch Phoron, Mustard Paste, Turmeric, Green Chillies',
      pairings: 'Luchi & Cholar Dal, Rice & Fish Curry, Khichdi',
      profile: 'Mustard-infused, sharp, and pungent',
    },
    {
      id: 'NORTHEAST',
      name: 'Northeast India',
      pickles: 'Bamboo Shoot Pickle · Naga Ghost Pepper (Bhut Jolokia)',
      oil: 'Light Sesame Oil / Infused Vegetable Oil',
      spices: 'Bhut Jolokia, Fermented Bamboo, Local Sichuan Pepper',
      pairings: 'Steamed Rice & Pork, Noodle Bowls, Smoky Roasts',
      profile: 'Smoky, fermented, and fiery specialty spices',
    },
  ],
  journey: [
    'Stage 1: My 7-Product Pilot (Testing formulation, shelf life, and margins)',
    'Stage 2: Document Learnings (Operational intelligence and customer response)',
    'Stage 3: Identify Existing Pickle Businesses (Micro, SHGs, and MSMEs across India)',
    'Stage 4: Assess Market Readiness (Food safety, capacity, and compliance)',
    'Stage 5: Connect with Buyers (Retail, B2B hospitality, e-commerce, and export)',
    'Stage 6: Build Pan-India Market-Access Network (Scalable ecosystem model)',
  ],
  marketAccess:
    'DesiBarni is building a structured pathway connecting small, regional pickle makers (home kitchens, women SHGs, MSMEs) with institutional buyers, supermarkets, D2C consumers, and global export channels.',
};

export const INITIAL_GREETING =
  "Namaste! 🙏 Welcome to DesiBarni.\n\nI'm your DesiBarni Assistant. I can help you explore our pickles, understand flavours, find products, learn about our story, and guide you through ordering.";

export const INITIAL_QUICK_ACTIONS = [
  'Explore Pickles',
  'Best Pickle for Me',
  'How Do I Order?',
  'Delivery Information',
  'About DesiBarni',
];

export const SMART_FALLBACK =
  "I'd be happy to help with that. I don't have enough information to give you an accurate answer right now. Please check the relevant DesiBarni page or contact the DesiBarni team for confirmation.";

export const OFF_TOPIC_REPLY =
  "I'm here to help with DesiBarni, our pickles, flavours, products, and ordering. What would you like to know about our collection?";

/**
 * Returns formatted product list
 */
export function getProductListSummary(): string {
  return products
    .map(
      (p) =>
        `• **${p.name}** (₹${p.price} / ${p.weight}) — *${p.flavourProfile}* [${p.region} Region]`
    )
    .join('\n');
}

/**
 * Finds a product by fuzzy match on name or slug
 */
export function findProduct(query: string): Product | undefined {
  const q = query.toLowerCase();
  return products.find(
    (p) =>
      p.slug.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      q.includes(p.shortName.toLowerCase()) ||
      q.includes(p.name.toLowerCase())
  );
}
