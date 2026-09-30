/**
 * Central brand configuration for Joe Davis Locksmiths.
 * All values reflect the real business as published on joedavis.co.za.
 */

export const BRAND = {
  name: "Joe Davis Locksmiths",
  shortName: "Joe Davis",
  domain: "joedavis.co.za",
  tagline: "Security for life.",
  established: 1947,
  // Mobile / WhatsApp line — used for the service-request flow.
  whatsappNumber: "27828823614",
  whatsappDisplay: "082 882 3614",
  // Branch landlines (from joedavis.co.za contact footer)
  branches: [
    {
      name: "Newton Park",
      address: "7 Frank Street, Newton Park, Gqeberha",
      phoneDisplay: "(+27) 41 364 1460",
      phoneTel: "+27413641460",
      email: "newtonpark@joedavis.co.za",
      mapsUrl:
        "https://www.google.com/maps/place/Joe+Davis+Locksmiths+-+Newton+Park/@-33.947423",
    },
    {
      name: "North End",
      address: "661 Govan Mbeki Avenue, North End, Gqeberha",
      phoneDisplay: "(+27) 41 487 1155",
      phoneTel: "+27414871155",
      email: "sales@joedavis.co.za",
      mapsUrl:
        "https://www.google.com/maps/place/Joe+Davis+Locksmiths+-+North+End/@-33.9418191",
    },
  ] as const,
  serviceArea: "Gqeberha (Port Elizabeth), the Eastern Cape, and beyond",
  hours:
    "Mon–Fri 08:00–17:00 · Sat 08:00–13:00 · 24/7 emergency callouts",
  email: "newtonpark@joedavis.co.za",
  facebookUrl: "https://www.facebook.com/",
  // Accreditation
  lasaAccredited: true,
  lasaDescription:
    "Fully accredited by the Locksmiths' Association of South Africa (LASA), ensuring trusted, professional service you can rely on.",
  psiraRegistered: true,
  psiraDescription:
    "Registered with the Private Security Industry Regulatory Authority (PSIRA), ensuring compliance with security regulations.",
} as const;

/**
 * The five "top services" listed on joedavis.co.za, in their original order.
 * Each entry has an icon image (downloaded from the original site) so the
 * visual identity matches the parent brand.
 */
export type Service = {
  id:
    | "vehicle-key-coding"
    | "key-cutting"
    | "access-controls"
    | "locksmithing"
    | "safes";
  label: string;
  shortDescription: string;
  longDescription: string;
  imageSrc: string;
  /** Icon name from lucide-react used in compact list views */
  icon: "key" | "cpu" | "shield" | "wrench" | "safe";
};

export const SERVICES: Service[] = [
  {
    id: "vehicle-key-coding",
    label: "Vehicle Key Coding",
    shortDescription: "Programming vehicle keys.",
    longDescription:
      "Transponder and smart-key programming for cars, bakkies and light commercials. We pair new and replacement keys to your vehicle's immobiliser, recover after ECU/BCM swaps, and disable lost keys so they can't be used to start the vehicle going forward.",
    imageSrc: "/assets/svc-1.png",
    icon: "cpu",
  },
  {
    id: "key-cutting",
    label: "Key Cutting",
    shortDescription: "Offering key cutting.",
    longDescription:
      "On-the-spot cutting for vehicle and household keys — conventional, laser and sidewinder profiles — done on our calibrated machines. Original-cut, duplicate-cut and code-cutting from a key code or VIN where supported.",
    imageSrc: "/assets/svc-2.png",
    icon: "key",
  },
  {
    id: "access-controls",
    label: "Access Controls",
    shortDescription: "Manage entry with security.",
    longDescription:
      "Electronic access control systems for homes, businesses and body corporates — keypad, card and biometric readers, electric strikes and magnetic locks, integrated with your existing doors and gates.",
    imageSrc: "/assets/svc-3.png",
    icon: "shield",
  },
  {
    id: "locksmithing",
    label: "Locksmithing",
    shortDescription: "Keep your property secure.",
    longDescription:
      "General locksmithing — lockouts, lock repairs and replacements, re-keying after a move or break-in, master-key systems for businesses, and security assessments for properties that aren't sure where they stand.",
    imageSrc: "/assets/svc-4.png",
    icon: "wrench",
  },
  {
    id: "safes",
    label: "Safes",
    shortDescription: "Supply and install safes.",
    longDescription:
      "Supply, installation and relocation of home and commercial safes — including bolt-down installation, combination changes, lock servicing and safe-opening when codes or keys are lost.",
    imageSrc: "/assets/svc-5.png",
    icon: "safe",
  },
];

/**
 * The work process as described on joedavis.co.za — kept identical to
 * the source so the mobile upgrade speaks the same language as the
 * parent brand.
 */
export const WORK_PROCESS = [
  {
    step: "Call us",
    description:
      "Reach out anytime, we're available 24/7 for emergencies or scheduled services.",
  },
  {
    step: "Quick response",
    description:
      "Our team arrives promptly, fully equipped to handle any lock or key issue.",
  },
  {
    step: "Secure & sorted",
    description:
      "We complete the job efficiently, ensuring your property is safe and secure.",
  },
] as const;

/**
 * Product / service categories the business actually stocks and works on
 * (from the joedavis.co.za Products menu).
 */
export const PRODUCT_CATEGORIES = [
  { label: "Access Controls", image: "/assets/cat-1.png" },
  { label: "Safes", image: "/assets/cat-2.png" },
  { label: "Vehicle Transponder Keys", image: "/assets/cat-3.png" },
] as const;

export const SUPPLIERS = [
  "Yale",
  "ABUS",
  "ABLOY",
  "CISA",
  "UNION",
  "Viro",
  "dorma kaba",
  "Centurion",
  "Nice",
  "BBL",
  "ISEO",
  "ET",
] as const;

export const TRUST_INDICATORS = [
  "Established 1947",
  "LASA accredited",
  "PSIRA registered",
  "24/7 emergency callouts",
] as const;
