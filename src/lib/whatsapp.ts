import { BRAND } from "@/lib/brand";

/**
 * Build a wa.me deep-link with a pre-filled message.
 * Returns a URL that opens WhatsApp with the message ready to send.
 */
export function buildWhatsAppLink(message: string, number: string = BRAND.whatsappNumber): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * A friendly default message used by the floating WhatsApp button
 * and the header CTA.
 */
export const DEFAULT_WHATSAPP_MESSAGE =
  `Hi ${BRAND.shortName}, I'd like to enquire about an auto locksmith service. ` +
  `Could you let me know when you're available?`;
