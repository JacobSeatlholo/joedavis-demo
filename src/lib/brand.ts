/**
 * Central brand configuration for Joe Davis Auto Locksmiths.
 * Update these values (especially the WhatsApp number) to go live.
 */

export const BRAND = {
  name: "Joe Davis Auto Locksmiths",
  shortName: "Joe Davis",
  domain: "joedavis.co.za",
  tagline: "Mobile auto locksmith — keys cut, transponders programmed, work accredited.",
  // South African mobile number, international format, no leading + or 00.
  // Replace with the real business WhatsApp number before going live.
  whatsappNumber: "27821234567",
  phoneDisplay: "+27 82 123 4567",
  email: "hello@joedavis.co.za",
  serviceArea: "Gauteng & surrounding areas, South Africa",
  hours: "Mon–Fri 07:00–18:00 · Sat 08:00–13:00 · Sun closed (emergency callouts only)",
  lasaRegNo: "LASA-MEM-2025-JD", // placeholder — replace with the real registration number
} as const;

/**
 * Service catalogue. Each entry drives the services grid and the
 * service-request form's first step.
 */
export type Service = {
  id: "key-cutting" | "transponder" | "lasa" | "other";
  label: string;
  shortDescription: string;
  longDescription: string;
  bullets: string[];
  icon: "key" | "chip" | "shield" | "wrench";
  indicativeFrom: string;
};

export const SERVICES: Service[] = [
  {
    id: "key-cutting",
    label: "Key Cutting",
    shortDescription:
      "Precision-cut automotive keys — standard, laser and high-security profiles — cut on-site.",
    longDescription:
      "On-the-spot cutting for vehicle keys of every profile, from conventional grooved blades to modern laser and sidewinder cuts. We work from original keys, key codes or — where the locks permit — decode the lock itself to produce a fresh key without the original in hand.",
    bullets: [
      "Conventional, laser and sidewinder profiles",
      "Code-cutting from VIN or key code (where supported)",
      "Original-cut and duplicate-cut options",
      "Broken key extraction and replacement",
    ],
    icon: "key",
    indicativeFrom: "R 180",
  },
  {
    id: "transponder",
    label: "Transponder Programming",
    shortDescription:
      "Program, pair and replace immobiliser transponders for most makes and models.",
    longDescription:
      "Transponder and smart-key programming for vehicles across the major makes sold in South Africa. We pair new or replacement transponders to your vehicle's immobiliser, recover keys after ECU/BCM replacement, and clear orphaned transponders so lost keys can't start the vehicle going forward.",
    bullets: [
      "New key pairing & replacement transponders",
      "Smart-key / proximity key programming",
      "Immobiliser reset after ECU/BCM swap",
      "Lost-key disabling (security wipe of orphaned transponders)",
    ],
    icon: "chip",
    indicativeFrom: "R 650",
  },
  {
    id: "lasa",
    label: "LASA-Accredited Work",
    shortDescription:
      "Locksmith Association of South Africa accredited work — insurance and SAPS-recognised.",
    longDescription:
      "Work carried out under LASA accreditation, recognised by South African insurers and law-enforcement. Suitable for insurance claims, formal verification, and any situation where a registered locksmith's report, invoice or key-cutting record is required.",
    bullets: [
      "Insurance-recognised work & documentation",
      "Stolen-key / break-in assessment reports",
      "Formal invoices and key-cutting records",
      "Code-of-conduct compliant service",
    ],
    icon: "shield",
    indicativeFrom: "Quoted on request",
  },
];

export const TRUST_INDICATORS = [
  "LASA-accredited",
  "Mobile — we come to you",
  "12+ years on South African roads",
  "Insurance-recognised reports",
] as const;
