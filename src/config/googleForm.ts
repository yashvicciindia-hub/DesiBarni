export const ORDER_FORM = {
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfs42OboulDFef4FBxxGTdExQd2beB-bJRWeZ-jfXhlBWaXOA/viewform',

  fields: {
    name: 'entry.1672651078',
    phone: 'entry.294820839',
    address: 'entry.1547560788',
    city: 'entry.782140287',
    state: 'entry.633030228',
    pincode: 'entry.1183345285',
  },
} as const;

// Alias for backward compatibility
export const GOOGLE_FORM_CONFIG = ORDER_FORM;

export type CustomerOrderData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email?: string;
  orderSummary?: string;
  total?: string;
};

/**
 * Builds a prefilled Google Form URL with proper URL encoding for all fields.
 * Handles spaces, '&', '+', commas, and special characters safely using URLSearchParams.
 */
export function buildGoogleFormPrefillUrl(data: CustomerOrderData): string {
  const params = new URLSearchParams();

  // Google Forms prefill mode identifier
  params.set('usp', 'pp_url');

  if (ORDER_FORM.fields.name && data.name) {
    params.set(ORDER_FORM.fields.name, data.name.trim());
  }
  if (ORDER_FORM.fields.phone && data.phone) {
    params.set(ORDER_FORM.fields.phone, data.phone.trim());
  }
  if (ORDER_FORM.fields.address && data.address) {
    params.set(ORDER_FORM.fields.address, data.address.trim());
  }
  if (ORDER_FORM.fields.city && data.city) {
    params.set(ORDER_FORM.fields.city, data.city.trim());
  }
  if (ORDER_FORM.fields.state && data.state) {
    params.set(ORDER_FORM.fields.state, data.state.trim());
  }
  if (ORDER_FORM.fields.pincode && data.pincode) {
    params.set(ORDER_FORM.fields.pincode, data.pincode.trim());
  }

  return `${ORDER_FORM.formUrl}?${params.toString()}`;
}

export const buildOrderPrefillUrl = buildGoogleFormPrefillUrl;

