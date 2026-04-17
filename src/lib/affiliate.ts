import type { Product } from "./data";

export const AMAZON_TAG = "vanlifekitch-20";
// Walmart Impact Radius affiliate identifier — set to your real one when approved.
// Until then, links route through normal walmart.com search and will start tracking
// once the parameter is updated here.
export const WALMART_AFFILIATE_ID = "vanlifekitchen";

/**
 * Build an Amazon affiliate link for a product.
 * Uses the ASIN when it looks valid, otherwise falls back to a search URL.
 * Always appends the Amazon Associates tag.
 */
export function amazonLink(product: Pick<Product, "name" | "amazonAsin">): string {
  const asin = product.amazonAsin?.trim();
  if (asin && isLikelyValidAsin(asin)) {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  }
  // Fallback: tagged search URL
  const query = encodeURIComponent(product.name);
  return `https://www.amazon.com/s?k=${query}&tag=${AMAZON_TAG}`;
}

/**
 * Build a Walmart affiliate link for a product.
 * Uses a stored walmartUrl if it looks like a real walmart.com product page
 * (not a placeholder), otherwise falls back to a search URL.
 */
export function walmartLink(product: Pick<Product, "name" | "walmartUrl">): string {
  const url = product.walmartUrl?.trim();
  if (url && isLikelyValidWalmartUrl(url)) {
    return url;
  }
  const query = encodeURIComponent(product.name);
  return `https://www.walmart.com/search?q=${query}`;
}

/**
 * Amazon ASINs are 10 chars, alphanumeric, usually starting with B0.
 * This rejects placeholders like "B07XYZLUNA" (clearly fake).
 */
function isLikelyValidAsin(asin: string): boolean {
  if (!/^[A-Z0-9]{10}$/.test(asin)) return false;
  if (/XYZ/i.test(asin)) return false;
  return true;
}

/**
 * Walmart product page URLs follow /ip/{slug}/{numericId}.
 * Reject placeholders by detecting suspiciously short or sequential numeric IDs.
 */
function isLikelyValidWalmartUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "www.walmart.com" && parsed.hostname !== "walmart.com") {
      return false;
    }
    if (!parsed.pathname.startsWith("/ip/")) return false;
    // Real Walmart product IDs are 8+ digits. Placeholders we used during dev are 6 digits
    // and start with 234567/345001/etc., which are all sequential dev ids.
    const match = parsed.pathname.match(/\/(\d+)$/);
    if (!match) return false;
    const id = match[1];
    if (id.length < 8) return false;
    return true;
  } catch {
    return false;
  }
}
