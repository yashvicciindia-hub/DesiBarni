export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  weight: string;
  ingredients: string[];
  flavourProfile: string;
  region: string;
  color: string;
  accent: string;
  available: boolean;
};

export const products: Product[] = [
  { id: 'mango', slug: 'mango-pickle', name: 'Mango Pickle', shortName: 'Mango', description: 'Bold, tangy and deeply rooted in India’s most-loved pickle tradition.', price: 349, weight: '250g', ingredients: ['Raw mango', 'Mustard', 'Red chilli', 'Gingelly oil'], flavourProfile: 'Tangy · Bold · Warming', region: 'North', color: '#d99124', accent: '#f4c56c', available: true },
  { id: 'red-chilli', slug: 'red-chilli-pickle', name: 'Red Chilli Pickle', shortName: 'Red Chilli', description: 'A slow-building heat with a smoky, sun-dried finish.', price: 379, weight: '250g', ingredients: ['Red chilli', 'Mustard', 'Garlic', 'Spices'], flavourProfile: 'Smoky · Fiery · Deep', region: 'West', color: '#b83a2f', accent: '#e8755f', available: true },
  { id: 'garlic', slug: 'garlic-pickle', name: 'Garlic Pickle', shortName: 'Garlic', description: 'Robust garlic softened by spice, oil and time.', price: 369, weight: '250g', ingredients: ['Garlic', 'Red chilli', 'Mustard', 'Spices'], flavourProfile: 'Robust · Savoury · Rich', region: 'South', color: '#d5a848', accent: '#f6e0a1', available: true },
  { id: 'green-chilli', slug: 'green-chilli-pickle', name: 'Green Chilli Pickle', shortName: 'Green Chilli', description: 'Fresh green heat with a bright, lingering tang.', price: 329, weight: '250g', ingredients: ['Green chilli', 'Lime', 'Mustard', 'Spices'], flavourProfile: 'Bright · Fresh · Hot', region: 'West', color: '#66752a', accent: '#a4b45b', available: true },
  { id: 'lime', slug: 'lime-pickle', name: 'Lime Pickle', shortName: 'Lime', description: 'Sunlit citrus, layered with salt and a fragrant masala.', price: 329, weight: '250g', ingredients: ['Lime', 'Red chilli', 'Mustard', 'Spices'], flavourProfile: 'Citrusy · Zesty · Fragrant', region: 'South', color: '#a5a33d', accent: '#e0d869', available: true },
  { id: 'ginger', slug: 'ginger-pickle', name: 'Ginger Pickle', shortName: 'Ginger', description: 'A warm, aromatic pickle with a clean ginger lift.', price: 359, weight: '250g', ingredients: ['Ginger', 'Lime', 'Green chilli', 'Spices'], flavourProfile: 'Warm · Aromatic · Zingy', region: 'South', color: '#a86b35', accent: '#e3aa68', available: true },
  { id: 'mixed-vegetable', slug: 'mixed-vegetable-pickle', name: 'Mixed Vegetable', shortName: 'Mixed Veg', description: 'A generous medley of crunch, colour and familiar comfort.', price: 349, weight: '250g', ingredients: ['Seasonal vegetables', 'Carrot', 'Green chilli', 'Spices'], flavourProfile: 'Crunchy · Balanced · Homely', region: 'North', color: '#71883e', accent: '#c8bd59', available: true },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
