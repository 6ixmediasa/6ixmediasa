export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  about: string;
  services: string[];
  tech: string[];
  year: string;
  industry: string;
  /* Optional images. Drop files in public/projects/ and reference them here.
     Leave them out and the card falls back to a letter placeholder. */
  cover?: string;
  shots?: string[];
};

const C = {
  web: "Web Design",
  shop: "E-Commerce",
  app: "Mobile App",
  webapp: "Web App",
  soft: "Software",
  logo: "Logo Design",
};

export const categories = [C.web, C.shop, C.app, C.webapp, C.soft, C.logo];

export const projects: Project[] = [
  /* ---------------------------------------------------- Web Design (5) */
  {
    slug: "nmcs-global",
    name: "NMCS GLOBAL",
    category: C.web,
    tagline: "Supply chain and logistics consultation company",
    about:
      "NMCS GLOBAL is a China based company handling supplychain management. They needed a site that felt authoritative without being cold, and that let clients book a consultation without phoning during office hours. We built a five-page site with service-area pages, an gallery, and a booking form that feeds straight into their calendar.",
    services: ["Web Design", "Development", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    year: "2025",
    industry: "Supply Chain",
    cover: "/projects/nmcs-global/cover.jpg",
  },
  {
    slug: "exquisite-management",
    name: "Exquisite Management",
    category: C.web,
    tagline: "Private supply and delivery service provider with client information hub",
    about:
      "A general practice serving three suburbs needed one place clients could find opening hours and complete service list, details and after-hours arrangements. The old site was a single page last updated in 2019. We rebuilt it with clear service pages and aconsultation booking form",
    services: ["Web Design", "Development", "Content"],
    tech: ["WordPress", "PHP", "MySQL"],
    year: "2025",
    industry: "Logistics",
    cover: "/projects/exquisite-management/cover.jpg",
  },
  {
    slug: "leseding-property",
    name: "City Ride My Cars",
    category: C.web,
    tagline: "Car listings site with area guides",
    about:
      "A car sales agency working across Gauteng. Listings previously lived on a third-party portal, which meant no direct enquiries and no search visibility. We built a site that hosts the listings directly, with filtering by suburb, price and models, and area guide pages that bring in search traffic from people browsing.",
    services: ["Web Design", "Development", "SEO"],
    tech: ["Next.js", "Tailwind CSS", "Sanity"],
    year: "2025",
    industry: "Property",
    cover: "/projects/leseding-property/cover.jpg",
  },
  {
    slug: "thabang-construction",
    name: "Thabang Construction",
    category: C.web,
    tagline: "Construction company site with project gallery",
    about:
      "A mid-size contractor bidding for municipal and private work. The brief was credibility: show completed projects, list certifications, and make the compliance documents easy for a procurement officer to find. We built a project gallery organised by sector and a downloads section for company documents.",
    services: ["Web Design", "Development", "Photography direction"],
    tech: ["WordPress", "PHP", "MySQL"],
    year: "2024",
    industry: "Construction",
    cover: "/projects/thabang-construction/cover.jpg",
  },
  {
    slug: "amani-lodge",
    name: "Amani Lodge",
    category: C.web,
    tagline: "Guesthouse website with enquiry and availability",
    about:
      "A twelve-room guesthouse relying entirely on booking platforms and losing fifteen percent of every night to commission. We built a site with room pages, a gallery, and a direct enquiry form, plus a rate comparison that gently makes the case for booking direct.",
    services: ["Web Design", "Development", "Copywriting"],
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    year: "2024",
    industry: "Hospitality",
    cover: "/projects/amani-lodge/cover.jpg",
  },

  /* ---------------------------------------------------- E-Commerce (5) */
  {
    slug: "sipho-spice-co",
    name: "Sipho Spice Co",
    category: C.shop,
    tagline: "Spice and rub brand selling direct to customers",
    about:
      "A small-batch spice producer moving from market stalls to online sales. We built a store with product variants for jar size, a subscription option for their monthly blend, and PayFast checkout. Recipe pages give customers a reason to return between orders.",
    services: ["E-Commerce", "Web Design", "Brand"],
    tech: ["WooCommerce", "PayFast", "WordPress"],
    year: "2025",
    industry: "Food & Beverage",
    cover: "/projects/sipho-spice-co/cover.jpg",
  },
  {
    slug: "zenzele-workwear",
    name: "Zenzele Workwear",
    category: C.shop,
    tagline: "Safety and workwear store with bulk ordering",
    about:
      "A workwear supplier serving both walk-in customers and corporate accounts. The store needed two pricing tiers: retail for the public, and trade pricing visible only to approved account holders. Bulk order forms let procurement buyers order by product code without browsing.",
    services: ["E-Commerce", "B2B Portal", "Development"],
    tech: ["WooCommerce", "PayFast", "Ozow"],
    year: "2025",
    industry: "Industrial Supply",
    cover: "/projects/zenzele-workwear/cover.jpg",
  },
  {
    slug: "naledi-jewellery",
    name: "Naledi Jewellery",
    category: C.shop,
    tagline: "Handmade jewellery store with custom order requests",
    about:
      "A jeweller selling handmade pieces and taking commissions. Product photography was the priority, so we built generous image galleries with zoom, plus a custom order flow that captures budget, timeline and reference images before a conversation starts.",
    services: ["E-Commerce", "Web Design", "Photography direction"],
    tech: ["Shopify", "Liquid", "Yoco"],
    year: "2024",
    industry: "Retail",
    cover: "/projects/naledi-jewellery/cover.jpg",
  },
  {
    slug: "mzansi-fresh",
    name: "Mzansi Fresh",
    category: C.shop,
    tagline: "Produce delivery store with weekly boxes",
    about:
      "A produce supplier delivering vegetable boxes across three suburbs. The store handles weight-based pricing, delivery day selection by postcode, and a recurring weekly box with the option to skip a week.",
    services: ["E-Commerce", "Development", "Logistics setup"],
    tech: ["WooCommerce", "PayFast", "WordPress"],
    year: "2024",
    industry: "Food & Beverage",
    cover: "/projects/mzansi-fresh/cover.jpg",
  },
  {
    slug: "urban-thread",
    name: "Urban Thread",
    category: C.shop,
    tagline: "Streetwear label with drop-based releases",
    about:
      "A clothing label that sells in limited drops rather than continuous stock. We built a store with scheduled product releases, a waiting-list signup for sold-out sizes, and a lookbook that doubles as a shoppable gallery.",
    services: ["E-Commerce", "Web Design", "Brand"],
    tech: ["Shopify", "Liquid", "Yoco"],
    year: "2024",
    industry: "Fashion",
    cover: "/projects/urban-thread/cover.jpg",
  },

  /* ---------------------------------------------------- Mobile App (5) */
  {
    slug: "lift-share-sa",
    name: "LiftShare SA",
    category: C.app,
    tagline: "Commuter lift-sharing app for iOS and Android",
    about:
      "A lift club app for commuters travelling the same corridors daily. Drivers post a route and seats, passengers request a spot, and the app handles matching, in-app messaging and fare splitting. Built cross-platform from one codebase to keep the budget within reach.",
    services: ["Mobile App", "UI Design", "Backend"],
    tech: ["React Native", "Node.js", "PostgreSQL"],
    year: "2025",
    industry: "Transport",
    cover: "/projects/lift-share-sa/cover.jpg",
  },
  {
    slug: "stokvel-tracker",
    name: "Stokvel Tracker",
    category: C.app,
    tagline: "Savings group management for members and treasurers",
    about:
      "Stokvels traditionally run on a paper book and trust. This app records contributions, shows every member their balance, and sends reminders before the monthly due date. The treasurer gets a payout schedule and an exportable statement.",
    services: ["Mobile App", "UI Design", "Backend"],
    tech: ["Flutter", "Firebase", "Node.js"],
    year: "2025",
    industry: "Fintech",
    cover: "/projects/stokvel-tracker/cover.jpg",
  },
  {
    slug: "clinic-queue",
    name: "Clinic Queue",
    category: C.app,
    tagline: "Appointment and queue app for private practices",
    about:
      "Patients book a slot, join a virtual queue, and get a notification when they are twenty minutes away from being seen. Built for practices where the waiting room is the bottleneck, with a reception-side dashboard for managing walk-ins.",
    services: ["Mobile App", "Web Dashboard", "Backend"],
    tech: ["React Native", "Node.js", "PostgreSQL"],
    year: "2024",
    industry: "Logistics",
    cover: "/projects/clinic-queue/cover.jpg",
  },
  {
    slug: "tuck-shop-orders",
    name: "Tuck Shop Orders",
    category: C.app,
    tagline: "School tuck shop pre-ordering for parents",
    about:
      "Parents load a balance, pre-order lunches for the week, and set dietary restrictions. The tuck shop gets a daily prep list instead of a lunchtime rush. Built with a deliberately simple interface for parents who are not comfortable with apps.",
    services: ["Mobile App", "Web Dashboard", "Payments"],
    tech: ["Flutter", "Firebase", "PayFast"],
    year: "2024",
    industry: "Education",
    cover: "/projects/tuck-shop-orders/cover.jpg",
  },
  {
    slug: "site-check",
    name: "SiteCheck",
    category: C.app,
    tagline: "Site inspection app with offline photo capture",
    about:
      "Field inspectors work where there is no signal, so the app stores inspections and photos locally and syncs when a connection returns. Each inspection produces a signed PDF report emailed to the client automatically.",
    services: ["Mobile App", "Backend", "PDF reporting"],
    tech: ["React Native", "SQLite", "Node.js"],
    year: "2024",
    industry: "Construction",
    cover: "/projects/site-check/cover.jpg",
  },

  /* ------------------------------------------------------- Web App (5) */
  {
    slug: "fleet-desk",
    name: "FleetDesk",
    category: C.webapp,
    tagline: "Vehicle fleet management dashboard",
    about:
      "A logistics operator tracking forty vehicles across service intervals, licence renewals, fuel spend and driver assignments. Previously three spreadsheets that disagreed with each other. Now one dashboard with alerts before a licence expires rather than after.",
    services: ["Web App", "UI Design", "Backend"],
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    year: "2025",
    industry: "Logistics",
    cover: "/projects/fleet-desk/cover.jpg",
  },
  {
    slug: "tender-track",
    name: "TenderTrack",
    category: C.webapp,
    tagline: "Tender pipeline and document management",
    about:
      "A contractor bidding on public tenders needed to track deadlines, compliance documents and submission status in one place. The app flags which certificates are expiring before a bid is submitted with an invalid one attached.",
    services: ["Web App", "Backend", "Document handling"],
    tech: ["Next.js", "PostgreSQL", "AWS S3"],
    year: "2025",
    industry: "Construction",
    cover: "/projects/tender-track/cover.jpg",
  },
  {
    slug: "learner-portal",
    name: "RM INSTITUTE",
    category: C.webapp,
    tagline: "Training provider course and certification portal",
    about:
      "An accredited training provider delivering short courses. Learners enrol, work through modules, submit assessments and download certificates. Administrators track cohort progress and export attendance registers for accreditation audits.",
    services: ["Web App", "UI Design", "Backend"],
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    year: "2024",
    industry: "Education",
    cover: "/projects/learner-portal/cover.jpg",
  },
  {
    slug: "quote-builder",
    name: "QuoteBuilder",
    category: C.webapp,
    tagline: "Quoting tool for a manufacturing business",
    about:
      "Quotes were taking two hours each because pricing lived in the head of one person. The tool holds material costs, labour rates and margin rules, and produces a branded PDF quote in under five minutes. Sales staff can now quote without escalating.",
    services: ["Web App", "Backend", "PDF generation"],
    tech: ["Next.js", "PostgreSQL", "React PDF"],
    year: "2024",
    industry: "Manufacturing",
    cover: "/projects/quote-builder/cover.jpg",
  },
  {
    slug: "booking-hub",
    name: "BookingHub",
    category: C.webapp,
    tagline: "Multi-location salon booking and staff scheduling",
    about:
      "Three salon branches with shared staff and separate booking books. The app handles staff rosters across locations, service durations, deposits at booking and automated reminders that cut no-shows noticeably in the first quarter.",
    services: ["Web App", "Payments", "Backend"],
    tech: ["Next.js", "PostgreSQL", "Yoco"],
    year: "2024",
    industry: "Beauty & Wellness",
    cover: "/projects/booking-hub/cover.jpg",
  },

  /* ------------------------------------------------------ Software (5) */
  {
    slug: "stock-sync",
    name: "StockSync",
    category: C.soft,
    tagline: "Inventory system linking warehouse and online store",
    about:
      "Stock counts in the warehouse and stock counts on the website disagreed daily, causing oversells. We built a system that treats the warehouse as the source of truth and pushes updates to the store, with a reconciliation report for anything that drifts.",
    services: ["Custom Software", "Integration", "Backend"],
    tech: ["Node.js", "PostgreSQL", "REST API"],
    year: "2025",
    industry: "Retail",
    cover: "/projects/stock-sync/cover.jpg",
  },
  {
    slug: "route-planner",
    name: "RoutePlanner",
    category: C.soft,
    tagline: "Delivery route optimisation and driver dispatch",
    about:
      "A distributor running twelve delivery vehicles planned routes manually every morning. The system now assigns drops by area and vehicle capacity, produces a driver run sheet, and captures proof of delivery with a photo and signature.",
    services: ["Custom Software", "Mobile", "Backend"],
    tech: ["Node.js", "PostgreSQL", "Mapbox"],
    year: "2025",
    industry: "Logistics",
    cover: "/projects/route-planner/cover.jpg",
  },
  {
    slug: "payroll-lite",
    name: "Phola Rebone",
    category: C.soft,
    tagline: "Payroll and leave tracking for a Tshwane Municipality vehicle repair warehouse",
    about:
      "A forty-person business outgrowing spreadsheets but not ready for enterprise payroll pricing. Handles hours, overtime, leave balances and payslip generation, with exports formatted for their accountant.",
    services: ["Custom Software", "Backend", "Reporting"],
    tech: ["Node.js", "PostgreSQL", "React"],
    year: "2024",
    industry: "Professional Services",
    cover: "/projects/payroll-lite/cover.jpg",
  },
  {
    slug: "asset-register",
    name: "Asset Register",
    category: C.soft,
    tagline: "Equipment tracking with QR code check-in and out",
    about:
      "Tools and equipment went missing between sites with no record of who had what. Every item now carries a QR code; staff scan to check items in and out from a phone, and the register shows current location and holder.",
    services: ["Custom Software", "Mobile", "Backend"],
    tech: ["Node.js", "PostgreSQL", "React Native"],
    year: "2024",
    industry: "Construction",
    cover: "/projects/asset-register/cover.jpg",
  },
  {
    slug: "member-billing",
    name: "Member Billing",
    category: C.soft,
    tagline: "Recurring billing and member management for a gym",
    about:
      "Debit order runs, failed payment follow-ups and membership freezes were all manual. The system handles recurring collection, retries failures on a schedule, and gives front desk staff a clear view of who is in good standing.",
    services: ["Custom Software", "Payments", "Backend"],
    tech: ["Node.js", "PostgreSQL", "PayFast"],
    year: "2024",
    industry: "Fitness",
    cover: "/projects/member-billing/cover.jpg",
  },

  /* ---------------------------------------------------- Logo Design (5) */
  {
    slug: "mnisi-mvula-holdings",
    name: "Mnisi Mvula Holdings",
    category: C.logo,
    tagline: "Brand identity for a construction company",
    about:
      "They needed a complete rebranding from logo designs, business cards, letterheads and various company profiles and presentation materials for daily business operations. Delivered with a full brand guideline document.",
    services: ["Logo Design", "Brand Identity", "Packaging"],
    tech: ["Illustrator", "Photoshop", "InDesign"],
    year: "2025",
    industry: "Food & Beverage",
    cover: "/projects/mnisi-mvula-holdings/cover.jpg",
  },
  {
    slug: "rapid-civil",
    name: "Rapid Civil",
    category: C.logo,
    tagline: "Rebranding for a construction vehicle rental company",
    about:
      "They needed a fresh rebranding from logo designs, business cards, letterheads and various company profiles and presentation materials for daily business operations. Delivered with a full brand guideline document.",
    services: ["Logo Design", "Brand Identity", "Signage"],
    tech: ["Illustrator", "Photoshop"],
    year: "2025",
    industry: "Fitness",
    cover: "/projects/rapid-civil/cover.jpg",
  },
  {
    slug: "sasa-legal",
    name: "Sasa Legal",
    category: C.logo,
    tagline: "Professional identity for a legal practice",
    about:
      "A new practice needed an identity that read as established without looking like every other law firm. We built a wordmark with a distinct letterform detail, paired with a restrained palette that works on letterheads and court documents.",
    services: ["Logo Design", "Brand Identity", "Stationery"],
    tech: ["Illustrator", "InDesign"],
    year: "2024",
    industry: "Supply Chain",
    cover: "/projects/sasa-legal/cover.jpg",
  },
  {
    slug: "khanya-solar",
    name: "Khanya Solar",
    category: C.logo,
    tagline: "Renewable energy installer brand",
    about:
      "A solar installer competing in a crowded market where every competitor uses a sun graphic. We went in a different direction entirely, building the mark around the idea of a household staying on rather than the energy source itself.",
    services: ["Logo Design", "Brand Identity", "Vehicle branding"],
    tech: ["Illustrator", "Photoshop"],
    year: "2024",
    industry: "Energy",
    cover: "/projects/khanya-solar/cover.jpg",
  },
  {
    slug: "little-lions",
    name: "Little Lions",
    category: C.logo,
    tagline: "Preschool identity and environmental branding",
    about:
      "An early learning centre wanting something warm without being childish, since the people choosing it are parents rather than children. Delivered with wall graphics, signage and a set of templates the staff use for newsletters.",
    services: ["Logo Design", "Brand Identity", "Environmental"],
    tech: ["Illustrator", "Photoshop", "InDesign"],
    year: "2024",
    industry: "Education",
    cover: "/projects/little-lions/cover.jpg",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(p: Project, n = 3) {
  return projects.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);
}
