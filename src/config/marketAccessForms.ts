// Centralized configuration for Market Access Google Forms
// Replace formUrl with the actual Google Form URL.
// Replace entry IDs with the actual Google Forms field entry IDs.

export const MARKET_ACCESS_FORMS = {
  producer: {
    formUrl: 'https://docs.google.com/forms/d/e/DUMMY_PRODUCER_FORM_ID/viewform',

    fields: {
      contactName: 'entry.PRODUCER_CONTACT_NAME',
      brandName: 'entry.PRODUCER_BRAND_NAME',
      phone: 'entry.PRODUCER_PHONE',
      email: 'entry.PRODUCER_EMAIL',
      region: 'entry.PRODUCER_REGION',
      productionScale: 'entry.PRODUCER_SCALE',
      pickleVarieties: 'entry.PRODUCER_VARIETIES',
      supportNeeded: 'entry.PRODUCER_SUPPORT',
    },
  },

  commercialBuyer: {
    formUrl: 'https://docs.google.com/forms/d/e/DUMMY_COMMERCIAL_BUYER_FORM_ID/viewform',

    fields: {
      companyName: 'entry.BUYER_COMPANY',
      contactName: 'entry.BUYER_CONTACT',
      phone: 'entry.BUYER_PHONE',
      email: 'entry.BUYER_EMAIL',
      buyerCategory: 'entry.BUYER_CATEGORY',
      monthlyVolume: 'entry.BUYER_VOLUME',
      specifications: 'entry.BUYER_SPECIFICATIONS',
    },
  },
} as const;

export type ProducerFormData = {
  contactName: string;
  brandName: string;
  phone: string;
  email: string;
  region: string;
  productionScale: string;
  pickleVarieties: string;
  supportNeeded: string;
};

export type CommercialBuyerFormData = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  buyerCategory: string;
  monthlyVolume: string;
  specifications: string;
};

/**
 * Builds prefilled Google Form URL for Local Pickle Producers.
 * Safe URL encoding for spaces, '&', '+', commas, and special characters via URLSearchParams.
 */
export function buildProducerPrefillUrl(data: ProducerFormData): string {
  const params = new URLSearchParams();
  params.set('usp', 'pp_url');

  const fields = MARKET_ACCESS_FORMS.producer.fields;
  if (fields.contactName) params.set(fields.contactName, data.contactName.trim());
  if (fields.brandName) params.set(fields.brandName, data.brandName.trim());
  if (fields.phone) params.set(fields.phone, data.phone.trim());
  if (fields.email) params.set(fields.email, data.email.trim());
  if (fields.region) params.set(fields.region, data.region.trim());
  if (fields.productionScale) params.set(fields.productionScale, data.productionScale.trim());
  if (fields.pickleVarieties) params.set(fields.pickleVarieties, data.pickleVarieties.trim());
  if (fields.supportNeeded) params.set(fields.supportNeeded, data.supportNeeded.trim());

  return `${MARKET_ACCESS_FORMS.producer.formUrl}?${params.toString()}`;
}

/**
 * Builds prefilled Google Form URL for Commercial Buyers.
 * Safe URL encoding for spaces, '&', '+', commas, and special characters via URLSearchParams.
 */
export function buildBuyerPrefillUrl(data: CommercialBuyerFormData): string {
  const params = new URLSearchParams();
  params.set('usp', 'pp_url');

  const fields = MARKET_ACCESS_FORMS.commercialBuyer.fields;
  if (fields.companyName) params.set(fields.companyName, data.companyName.trim());
  if (fields.contactName) params.set(fields.contactName, data.contactName.trim());
  if (fields.phone) params.set(fields.phone, data.phone.trim());
  if (fields.email) params.set(fields.email, data.email.trim());
  if (fields.buyerCategory) params.set(fields.buyerCategory, data.buyerCategory.trim());
  if (fields.monthlyVolume) params.set(fields.monthlyVolume, data.monthlyVolume.trim());
  if (fields.specifications) params.set(fields.specifications, data.specifications.trim());

  return `${MARKET_ACCESS_FORMS.commercialBuyer.formUrl}?${params.toString()}`;
}
