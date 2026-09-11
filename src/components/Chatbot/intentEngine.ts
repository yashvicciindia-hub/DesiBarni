import { products, type Product } from '@/data/products';
import {
  BRAND_INFO,
  SMART_FALLBACK,
  OFF_TOPIC_REPLY,
  type ChatbotResponse,
  type ChatbotAction,
} from './knowledgeBase';

interface MatchContext {
  pathname: string;
}

/**
 * Intelligent frontend rule & keyword intent matcher.
 * Matches user inquiries strictly against verified DesiBarni codebase data.
 */
export function generateChatbotResponse(
  rawInput: string,
  context: MatchContext
): ChatbotResponse {
  const query = rawInput.trim().toLowerCase();

  // Helper to test if any term appears in query
  const has = (...terms: string[]) =>
    terms.some((term) => query.includes(term.toLowerCase()));

  // Check if query is looking at a specific product
  const matchedProduct = products.find(
    (p) =>
      query.includes(p.slug) ||
      query.includes(p.shortName.toLowerCase()) ||
      query.includes(p.name.toLowerCase()) ||
      (p.slug === 'mixed-vegetable-pickle' &&
        (query.includes('mixed') || query.includes('veg'))) ||
      (p.slug === 'red-chilli-pickle' &&
        (query.includes('red chilli') || query.includes('lal mirch'))) ||
      (p.slug === 'green-chilli-pickle' &&
        (query.includes('green chilli') || query.includes('hari mirch')))
  );

  // 1. Current route context awareness
  const isOnCheckout = context.pathname === '/checkout';
  const isOnRegions = context.pathname === '/regions';
  const isViewingProductSlug = context.pathname.startsWith('/product/')
    ? context.pathname.replace('/product/', '')
    : null;
  const currentViewedProduct = isViewingProductSlug
    ? products.find((p) => p.slug === isViewingProductSlug)
    : null;

  // 2. Greetings
  if (/^(hi|hello|hey|namaste|pranam|namaskaram|greetings)\b/i.test(query)) {
    let extra = '';
    if (isOnCheckout) {
      extra =
        '\n\nI see you are at the **Checkout page**! Let me know if you need help with your delivery details or order submission.';
    } else if (currentViewedProduct) {
      extra = `\n\nI see you are viewing our **${currentViewedProduct.name}**! Would you like to know about its ingredients, flavour profile, or pairings?`;
    }

    return {
      text: `Namaste! 🙏 How may I assist you today? You can ask me about our 7 authentic pickles, regional traditions, spice profiles, or how to place your order.${extra}`,
      actions: [
        { label: 'Explore Pickles', path: '/pickles' },
        { label: 'Regional Flavours', path: '/regions' },
      ],
      suggestions: ['Explore Pickles', 'Best Pickle for Me', 'How Do I Order?'],
    };
  }

  // 3. Specific product pricing
  if (matchedProduct && (has('price', 'cost', 'rate', 'how much', 'rupee', 'rs', '₹'))) {
    return {
      text: `The **${matchedProduct.name}** is priced at **₹${matchedProduct.price}** for an authentic sealed **${matchedProduct.weight}** glass barni (jar).\n\n*Flavour Profile:* ${matchedProduct.flavourProfile}\n*Region:* ${matchedProduct.region} India`,
      actions: [
        { label: `View ${matchedProduct.shortName} Pickle`, path: `/product/${matchedProduct.slug}` },
        { label: 'All Pickles', path: '/pickles' },
      ],
      suggestions: [`Ingredients in ${matchedProduct.shortName}`, 'How Do I Order?'],
    };
  }

  // 4. Specific product ingredients
  if (
    matchedProduct &&
    has('ingredient', 'ingredients', 'what is in', 'recipe', 'contain', 'contents', 'made of', 'oil')
  ) {
    return {
      text: `The **${matchedProduct.name}** is crafted with traditional, natural ingredients:\n\n${matchedProduct.ingredients
        .map((item) => `• ${item}`)
        .join('\n')}\n\n*Flavour notes:* ${matchedProduct.flavourProfile}.\nCrafted in small batches with zero synthetic fillers.`,
      actions: [
        { label: `View ${matchedProduct.shortName} Pickle`, path: `/product/${matchedProduct.slug}` },
        { label: 'Explore Collection', path: '/pickles' },
      ],
      suggestions: [`Price of ${matchedProduct.shortName}`, 'Best Pickle for Me'],
    };
  }

  // 5. Specific product general inquiry
  if (
    matchedProduct &&
    (has('want', 'like', 'buy', 'detail', 'tell me about', 'order', 'show', 'where can i find') ||
      query.trim() === matchedProduct.name.toLowerCase() ||
      query.trim() === matchedProduct.shortName.toLowerCase())
  ) {
    return {
      text: `**${matchedProduct.name}** (₹${matchedProduct.price} · ${matchedProduct.weight})\n\n${matchedProduct.description}\n\n• **Region:** ${matchedProduct.region} India\n• **Taste:** ${matchedProduct.flavourProfile}\n• **Key Ingredients:** ${matchedProduct.ingredients.join(', ')}`,
      actions: [
        { label: `View ${matchedProduct.shortName} Pickle`, path: `/product/${matchedProduct.slug}` },
        { label: 'All Pickles', path: '/pickles' },
      ],
      suggestions: ['How Do I Order?', 'Explore Pickles'],
    };
  }

  // 6. Navigation / "Take me to..." / "Show pickles"
  if (
    has('take me to', 'go to', 'show pickles', 'view pickles', 'open pickles', 'see collection')
  ) {
    return {
      text: 'You can explore our complete collection of seven regional pickles on the collection page!',
      actions: [
        { label: 'View All Pickles', path: '/pickles' },
        { label: 'Go to Checkout', path: '/checkout' },
      ],
    };
  }

  // 7. Regional Flavours & Culinary Zones
  if (
    has(
      'regional',
      'regions',
      'tradition',
      'traditions',
      'north india',
      'south india',
      'west india',
      'east india',
      'northeast',
      'andhra',
      'gujarat',
      'punjab'
    )
  ) {
    return {
      text: `India has five rich culinary pickle zones represented in our map:\n\n• **North India:** Bold, oil-rich Punjabi Mango & Mixed Veg in cold-pressed mustard oil with fennel and kalonji.\n• **West India:** Sweet-spicy harmonies like Gujarati Chundo in filtered groundnut oil.\n• **South India:** Fiery Andhra Avakaya and Garlic pickles steeped in pure Gingelly (sesame) oil.\n• **East India:** Mustard-infused, pungent kasundi and panch phoron recipes.\n• **Northeast India:** Fermented bamboo shoot & Naga Bhut Jolokia (king chilli).\n\nExplore our interactive map to discover regional pairings and spice metrics!`,
      actions: [
        { label: 'Explore Regional Map', path: '/regions' },
        { label: 'View Collection', path: '/pickles' },
      ],
      suggestions: ['Explore Pickles', 'Best Pickle for Me'],
    };
  }

  // 8. All Pickles / Catalog inquiry / "What pickles do you have?"
  if (
    has(
      'what pickles',
      'which pickles',
      'explore pickles',
      'collection',
      'all pickles',
      'list of pickles',
      'menu',
      'products',
      'flavours',
      'flavors',
      'varieties',
      'types of pickle'
    )
  ) {
    const list = products
      .map((p) => `• **${p.name}** (₹${p.price} / ${p.weight}) — *${p.flavourProfile}*`)
      .join('\n');

    return {
      text: `We currently offer **seven authentic regional pickles** in traditional 250g glass barnis:\n\n${list}\n\nEach is handcrafted with regional cold-pressed oils and generational recipes.`,
      actions: [
        { label: 'View Full Collection', path: '/pickles' },
        { label: 'Explore Regional Map', path: '/regions' },
      ],
      suggestions: ['Which pickle is spicy?', 'Best Pickle for Me', 'How Do I Order?'],
    };
  }

  // 8. Spice levels / Spicy / Hot / Mild inquiries
  if (
    has(
      'spicy',
      'spice',
      'hot',
      'fiery',
      'heat',
      'mild',
      'sweet',
      'least spicy',
      'spiciest',
      'tangy',
      'sour'
    )
  ) {
    if (has('mild', 'least', 'not spicy', 'low heat', 'less spice')) {
      return {
        text: `If you prefer milder, balanced flavours, we recommend:\n\n1. **Mixed Vegetable** (₹349) — *Crunchy · Balanced · Homely* (North India)\n2. **Lime Pickle** (₹329) — *Citrusy · Zesty · Fragrant* (South India)\n\nBoth deliver comforting, familiar tang without overpowering heat.`,
        actions: [
          { label: 'View Mixed Vegetable', path: '/product/mixed-vegetable-pickle' },
          { label: 'View Lime Pickle', path: '/product/lime-pickle' },
        ],
        suggestions: ['Explore Pickles', 'How Do I Order?'],
      };
    }

    if (has('tangy', 'sour', 'citrus', 'khatta')) {
      return {
        text: `For a mouth-watering, tangy punch, try:\n\n1. **Mango Pickle** (₹349) — *Tangy · Bold · Warming*, cold-pressed mustard oil with raw mango.\n2. **Lime Pickle** (₹329) — *Citrusy · Zesty · Fragrant*, sun-cured citrus with fragrant masala.`,
        actions: [
          { label: 'View Mango Pickle', path: '/product/mango-pickle' },
          { label: 'View Lime Pickle', path: '/product/lime-pickle' },
        ],
      };
    }

    // Default hot/spicy
    return {
      text: `Looking for authentic Indian heat? Here are our top spice-forward preserves:\n\n1. 🔥 **Red Chilli Pickle** (₹379) — *Smoky · Fiery · Deep*, sun-dried red chillies with garlic and mustard oil.\n2. 🌶️ **Green Chilli Pickle** (₹329) — *Bright · Fresh · Hot*, fresh green chillies with a zesty lime lift.\n3. 🧄 **Garlic Pickle** (₹369) — *Robust · Savoury · Rich*, slow-matured garlic cloves with fiery spices.`,
      actions: [
        { label: 'View Red Chilli Pickle', path: '/product/red-chilli-pickle' },
        { label: 'View Green Chilli Pickle', path: '/product/green-chilli-pickle' },
        { label: 'View All Pickles', path: '/pickles' },
      ],
      suggestions: ['How Do I Order?', 'Tell me about Garlic Pickle'],
    };
  }

  // 9. Best pickle for me / Recommendations
  if (
    has(
      'best pickle',
      'recommend',
      'recommendation',
      'suggest',
      'which one should i buy',
      'what should i try',
      'favorite'
    )
  ) {
    return {
      text: `Every DesiBarni preserve brings a unique regional heritage:\n\n• **For the classic lover:** *Mango Pickle* (Classic North Indian Punjabi tang)\n• **For the spice lover:** *Red Chilli Pickle* (Smoky, fiery heat)\n• **For the garlic enthusiast:** *Garlic Pickle* (Robust, rich, savoury)\n• **For comfort food & curd rice:** *Lime Pickle* or *Ginger Pickle*\n• **For everyday meals & parathas:** *Mixed Vegetable*\n\nWhich flavor profile appeals most to your palate?`,
      actions: [
        { label: 'View All Pickles', path: '/pickles' },
        { label: 'Regional Flavours Map', path: '/regions' },
      ],
      suggestions: ['Which pickle is spicy?', 'How Do I Order?'],
    };
  }

  // 10. Ordering & Checkout process
  if (
    has(
      'how to order',
      'how do i order',
      'how to buy',
      'place order',
      'purchase',
      'checkout',
      'buy now',
      'payment',
      'google form',
      'order process'
    )
  ) {
    return {
      text: `Ordering from DesiBarni is straightforward:\n\n1. **Browse & Add:** Visit our **Our Pickles** collection and click **Add to Barni** on your choices.\n2. **Review Cart:** Click the **Barni icon** in the top-right header to adjust jar quantities.\n3. **Go to Checkout:** Click **Checkout** and enter your delivery details (Name, Phone, Address, City, State, Pincode).\n4. **Place Order:** Click **Place Order**. This opens our prefilled Google Form in a new tab to record your order details for our team.\n\n*Note:* This is currently a demo/order collection flow; no automated payment is charged.`,
      actions: [
        { label: 'Go to Checkout', path: '/checkout' },
        { label: 'Explore Pickles', path: '/pickles' },
      ],
      suggestions: ['Delivery Information', 'Can I buy two jars?'],
    };
  }

  // 11. Quantity / Multiple jars / Weight
  if (
    has(
      'quantity',
      'quantities',
      'two jars',
      'multiple',
      'size',
      'weight',
      'grams',
      'gm',
      'can i buy',
      'jar size'
    )
  ) {
    return {
      text: `Yes! Every DesiBarni pickle comes in an authentic **250g glass barni**.\n\nYou can easily adjust the quantity of jars using the **+** and **-** buttons on any product detail page, or directly inside your Cart Drawer. Once ready, proceed to Checkout to submit your order!`,
      actions: [
        { label: 'Explore Pickles', path: '/pickles' },
        { label: 'Go to Checkout', path: '/checkout' },
      ],
      suggestions: ['How Do I Order?', 'Delivery Information'],
    };
  }

  // 12. Delivery / Shipping / Dispatch
  if (has('delivery', 'shipping', 'dispatch', 'courier', 'ship', 'location', 'pincode')) {
    return {
      text: `We prepare and securely pack our glass barnis to ensure fresh, leak-proof arrival across India as part of our pilot initiative.\n\nWhen you click **Place Order** on the checkout page, your pincode and shipping address are collected via our prefilled order form so our fulfilment team can coordinate delivery.`,
      actions: [
        { label: 'Go to Checkout', path: '/checkout' },
        { label: 'Market Access Info', path: '/market-access' },
      ],
      suggestions: ['How Do I Order?', 'About DesiBarni'],
    };
  }

  // 13. Brand story / About DesiBarni / Who are you?
  if (
    has(
      'about desibarni',
      'what is desibarni',
      'about us',
      'brand',
      'story',
      'who are you',
      'mission',
      'why desibarni',
      'meaning of barni'
    )
  ) {
    return {
      text: `**DesiBarni** celebrates India's regional pickle heritage: *"One country. Hundreds of regional tastes."*\n\nA *barni* is the traditional ceramic or glass jar in which Indian grandmothers and regional kitchens sun-cure pickles with patience, salt, and spices.\n\nWe connect these authentic regional recipes—from Punjabi raw mango aged in Kacchi Ghani mustard oil to fiery Andhra Avakaya—with modern tables across India.`,
      actions: [
        { label: 'Our Journey', path: '/journey' },
        { label: 'Regional Flavours', path: '/regions' },
      ],
      suggestions: ['Explore Pickles', 'Market Access Initiative'],
    };
  }


  // 15. Market Access Initiative / Producers / Commercial buyers
  if (
    has(
      'market access',
      'partner',
      'partnership',
      'producer',
      'sell my pickle',
      'b2b',
      'retailer',
      'export',
      'fpo',
      'shg',
      'msme',
      'bulk'
    )
  ) {
    return {
      text: `The **DesiBarni Market Access Initiative** bridges small-scale regional pickle producers (home kitchens, women SHGs, MSMEs) with commercial buyers (retailers, hotels, catering, e-commerce, and export diaspora).\n\nWhether you are a producer seeking packaging & market access or a commercial buyer sourcing authentic regional preserves, you can connect directly with our onboarding team.`,
      actions: [
        { label: 'Market Access Pathway', path: '/market-access' },
        { label: 'Partner Inquiry Form', path: '/market-access#partner-form' },
      ],
      suggestions: ['Our Journey', 'Explore Pickles'],
    };
  }

  // 16. Journey / 6-stage roadmap / Pilot
  if (has('journey', 'pilot', 'roadmap', 'stages', 'next', 'scale', 'future')) {
    return {
      text: `DesiBarni's journey moves through six deliberate stages:\n\n1. **My 7-Product Pilot** — Live R&D testing formulation, shelf life, and margins.\n2. **Document Learnings** — Capturing operational and customer intelligence.\n3. **Identify Pickle Businesses** — Mapping micro-kitchens and MSMEs across India.\n4. **Assess Market Readiness** — Testing food safety, capacity, and compliance.\n5. **Connect with Buyers** — Direct linkages to retail, B2B, and export.\n6. **Pan-India Network** — Scaling the sustainable ecosystem nationwide.`,
      actions: [
        { label: 'View Journey Page', path: '/journey' },
        { label: 'Market Access Strategy', path: '/market-access' },
      ],
      suggestions: ['Explore Pickles', 'About DesiBarni'],
    };
  }

  // 17. Contact / Help / Support
  if (has('contact', 'support', 'help', 'email', 'phone number', 'reach', 'call')) {
    return {
      text: `You can reach the DesiBarni team through the following official channels:\n\n• **Partner & Buyer Inquiries:** Visit the onboarding form on our **Market Access** page.\n• **Follow & Socials:** Connect with us on Instagram, YouTube, and our Journal (links in the website footer).\n• **Orders:** Fill your details on our **Checkout** page and submit via the prefilled order form.`,
      actions: [
        { label: 'Partner Onboarding Form', path: '/market-access#partner-form' },
        { label: 'Go to Checkout', path: '/checkout' },
      ],
    };
  }

  // 18. Cart questions
  if (has('cart', 'barni', 'basket', 'bag', 'remove', 'add to cart')) {
    return {
      text: `Your **Barni** is your shopping cart! When browsing pickles, click **Add to Barni**. You can view your current items, update quantities, or proceed to checkout by clicking the Barni icon in the top navigation bar.`,
      actions: [
        { label: 'Go to Checkout', path: '/checkout' },
        { label: 'Explore Pickles', path: '/pickles' },
      ],
    };
  }

  // 19. If user asks about discounts, coupons, offers, medical claims, certifications
  if (
    has('discount', 'coupon', 'offer', 'promo', 'code', 'cheap', 'free', 'cure', 'medicine', 'health claim')
  ) {
    return {
      text: `DesiBarni preserves are artisanal small-batch preparations crafted with pure ingredients. We currently do not have promotional discount codes or offers active on the store. All 7 pickles are transparently priced between ₹329 and ₹379 for 250g jars.`,
      actions: [{ label: 'View Collection', path: '/pickles' }],
      suggestions: ['Explore Pickles', 'How Do I Order?'],
    };
  }

  // 20. Off-topic check (e.g. asking about coding, politics, weather, unrelated brands)
  if (
    has(
      'weather',
      'politics',
      'president',
      'code',
      'python',
      'javascript',
      'react',
      'movie',
      'cricket',
      'bitcoin',
      'crypto'
    )
  ) {
    return {
      text: OFF_TOPIC_REPLY,
      actions: [
        { label: 'Explore Pickles', path: '/pickles' },
        { label: 'About DesiBarni', path: '/journey' },
      ],
      suggestions: ['Explore Pickles', 'Best Pickle for Me', 'About DesiBarni'],
    };
  }

  // 21. Smart Fallback for unanswerable / unverified queries
  return {
    text: SMART_FALLBACK,
    actions: [
      { label: 'Explore Pickles', path: '/pickles' },
      { label: 'Regional Flavours', path: '/regions' },
      { label: 'Market Access', path: '/market-access' },
    ],
    suggestions: ['Explore Pickles', 'Which pickle is spicy?', 'How Do I Order?'],
  };
}
