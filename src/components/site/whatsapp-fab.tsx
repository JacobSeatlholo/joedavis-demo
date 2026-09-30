"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

/**
 * Floating WhatsApp action button.
 * Fixed to the bottom-right, above the safe area on mobile.
 */
export function WhatsAppFab() {
  const href = buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Joe Davis Auto Locksmiths on WhatsApp"
      className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center justify-center rounded-full h-14 w-14 shadow-lg shadow-black/20 bg-[#25D366] text-white hover:bg-[#1ebd5a] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 18 }}
      whileTap={{ scale: 0.92 }}
    >
      <MessageCircle className="h-6 w-6" />
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 -z-10"
        aria-hidden="true"
      />
    </motion.a>
  );
}
