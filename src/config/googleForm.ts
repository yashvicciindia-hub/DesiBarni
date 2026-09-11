// Replace formUrl with the actual Google Form URL.
// Replace entry IDs with the actual Google Forms field entry IDs.
export const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/DUMMY_FORM_ID/viewform',

  fields: {
    name: 'entry.NAME',
    phone: 'entry.PHONE',
    email: 'entry.EMAIL',
    address: 'entry.ADDRESS',
    city: 'entry.CITY',
    state: 'entry.STATE',
    pincode: 'entry.PINCODE',
    order: 'entry.ORDER',
    total: 'entry.TOTAL',
  },
} as const;

export type CustomerOrderData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderSummary: string;
  total: string;
};

/**
 * Builds a prefilled Google Form URL with proper URL encoding for all fields.
 * Handles spaces, '&', '+', commas, and special characters safely using URLSearchParams.
 */
export function buildGoogleFormPrefillUrl(data: CustomerOrderData): string {
  const params = new URLSearchParams();

  // Google Forms prefill mode identifier
  params.set('usp', 'pp_url');

  if (GOOGLE_FORM_CONFIG.fields.name) {
    params.set(GOOGLE_FORM_CONFIG.fields.name, data.name.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.phone) {
    params.set(GOOGLE_FORM_CONFIG.fields.phone, data.phone.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.email) {
    params.set(GOOGLE_FORM_CONFIG.fields.email, data.email.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.address) {
    params.set(GOOGLE_FORM_CONFIG.fields.address, data.address.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.city) {
    params.set(GOOGLE_FORM_CONFIG.fields.city, data.city.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.state) {
    params.set(GOOGLE_FORM_CONFIG.fields.state, data.state.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.pincode) {
    params.set(GOOGLE_FORM_CONFIG.fields.pincode, data.pincode.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.order) {
    params.set(GOOGLE_FORM_CONFIG.fields.order, data.orderSummary.trim());
  }
  if (GOOGLE_FORM_CONFIG.fields.total) {
    params.set(GOOGLE_FORM_CONFIG.fields.total, data.total.trim());
  }

  return `${GOOGLE_FORM_CONFIG.formUrl}?${params.toString()}`;
}
