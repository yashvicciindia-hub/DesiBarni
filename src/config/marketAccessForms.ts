// Centralized configuration for Market Access Google Forms
// Replace formUrl with the actual Google Form URL.
// Replace entry IDs with the actual Google Forms field entry IDs.

export const MARKET_ACCESS_FORMS = {
  producer: {
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSejHogNYQo50PIzApQNNXSvavON3pJ5ggNv-1tAYl2EKc0r5Q/viewform',

    fields: {
      contactName: 'entry.68274384',
      phone: 'entry.1841013276',
      email: 'entry.190520906',
      region: 'entry.1603295075',
      productionScale: 'entry.301711658',
      pickleVarieties: 'entry.1431324098',
      monthlyProduction: 'entry.192830422',
      supportNeeded: 'entry.188659237',
      consent: 'entry.1819522279',
    },
  },

  commercialBuyer: {
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeCooUU5l-R2qC3_6PEp7oB3fFPjBuc4GUV70UqGM_9q2H_jA/viewform',

    fields: {
      companyName: 'entry.831406794',
      sourcingManager: 'entry.1909502171',
      phone: 'entry.426291754',
      email: 'entry.700505619',
      buyerCategory: 'entry.1753835981',
      estimatedMonthlyVolume: 'entry.1244554652',
      regionalFlavours: 'entry.1217443475',
      pickleSpecification: 'entry.166613227',
      packagingPreference: 'entry.523034277',
      deliveryRequirements: 'entry.1066633699',
      consent: 'entry.2023372779',
    },
  },
} as const;

export type ProducerFormData = {
  contactName: string;
  phone: string;
  email: string;
  region: string;
  productionScale: string;
  pickleVarieties?: string;
  monthlyProduction?: string;
  supportNeeded?: string;
  consent?: string;
  brandName?: string;
};

export type CommercialBuyerFormData = {
  companyName: string;
  sourcingManager?: string;
  contactName?: string;
  phone: string;
  email: string;
  buyerCategory: string;
  estimatedMonthlyVolume?: string;
  monthlyVolume?: string;
  regionalFlavours?: string;
  pickleSpecification?: string;
  specifications?: string;
  packagingPreference?: string;
  deliveryRequirements?: string;
  consent?: string;
};

/**
 * Builds prefilled Google Form URL for Local Pickle Producers.
 * Uses real Google Form entry IDs and dynamically encodes actual user-entered values.
 */
export function buildProducerPrefillUrl(data: ProducerFormData): string {
  const params = new URLSearchParams();
  params.set('usp', 'pp_url');

  const fields = MARKET_ACCESS_FORMS.producer.fields;
  if (fields.contactName && data.contactName) {
    params.set(fields.contactName, data.contactName.trim());
  }
  if (fields.phone && data.phone) {
    params.set(fields.phone, data.phone.trim());
  }
  if (fields.email && data.email) {
    params.set(fields.email, data.email.trim());
  }
  if (fields.region && data.region) {
    params.set(fields.region, data.region.trim());
  }
  if (fields.productionScale && data.productionScale) {
    params.set(fields.productionScale, data.productionScale.trim());
  }
  if (fields.pickleVarieties && data.pickleVarieties) {
    params.set(fields.pickleVarieties, data.pickleVarieties.trim());
  }
  if (fields.monthlyProduction && data.monthlyProduction) {
    params.set(fields.monthlyProduction, data.monthlyProduction.trim());
  }
  if (fields.supportNeeded && data.supportNeeded) {
    params.set(fields.supportNeeded, data.supportNeeded.trim());
  }
  if (fields.consent && data.consent) {
    params.set(fields.consent, data.consent.trim());
  }

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
  if (fields.companyName && data.companyName) {
    params.set(fields.companyName, data.companyName.trim());
  }

  const manager = data.sourcingManager || data.contactName;
  if (fields.sourcingManager && manager) {
    params.set(fields.sourcingManager, manager.trim());
  }

  if (fields.phone && data.phone) {
    params.set(fields.phone, data.phone.trim());
  }
  if (fields.email && data.email) {
    params.set(fields.email, data.email.trim());
  }
  if (fields.buyerCategory && data.buyerCategory) {
    params.set(fields.buyerCategory, data.buyerCategory.trim());
  }

  const volume = data.estimatedMonthlyVolume || data.monthlyVolume;
  if (fields.estimatedMonthlyVolume && volume) {
    params.set(fields.estimatedMonthlyVolume, volume.trim());
  }

  if (fields.regionalFlavours && data.regionalFlavours) {
    params.set(fields.regionalFlavours, data.regionalFlavours.trim());
  }

  const spec = data.pickleSpecification || data.specifications;
  if (fields.pickleSpecification && spec) {
    params.set(fields.pickleSpecification, spec.trim());
  }

  if (fields.packagingPreference && data.packagingPreference) {
    params.set(fields.packagingPreference, data.packagingPreference.trim());
  }
  if (fields.deliveryRequirements && data.deliveryRequirements) {
    params.set(fields.deliveryRequirements, data.deliveryRequirements.trim());
  }
  if (fields.consent && data.consent) {
    params.set(fields.consent, data.consent.trim());
  }

  return `${MARKET_ACCESS_FORMS.commercialBuyer.formUrl}?${params.toString()}`;
}
