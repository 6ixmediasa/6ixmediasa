export type Block = { h: string; body: string; points?: string[] };
export type PageDoc = {
  slug: string;
  parent?: { label: string; href: string };
  eyebrow: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  price?: string;
  priceNote?: string;
  blocks: Block[];
  deliverables?: string[];
  faqs?: { q: string; a: string }[];
  related?: string[];
  /* PDFs are detected automatically from public/docs — see the README in
     that folder. This field is only needed to override the automatic
     behaviour with a custom label or order. */
  docs?: { label: string; file: string; note?: string }[];
};

/* ------------------------------------------------------------------ hubs */

const hubs: PageDoc[] = [
  {
    slug: "websites",
    eyebrow: "Websites",
    h1: "Website design for South African businesses",
    lead: "Custom websites built around what your business actually sells — designed in Pretoria, delivered anywhere in South Africa, from R1,500 with hosting and a domain included.",
    metaTitle: "Website Design Pretoria & South Africa | From R1,500",
    metaDescription:
      "Custom website design for South African businesses. Landing pages from R1,500, business sites from R3,500. Hosting and domain included for the first year.",
    blocks: [
      {
        h: "What we build",
        body: "Most small businesses need one of three things: a single page to test an offer, a five-to-eight page site that explains what they do, or a rebuild of something that has aged badly. We will tell you which one you need, including when the answer is the cheapest option.",
        points: [
          "Landing pages for a single offer or ad campaign",
          "Business websites of five to eight pages",
          "Redesigns and migrations from an existing site",
          "Ongoing maintenance and hosting",
        ],
      },
      {
        h: "How we work",
        body: "You see a full design of the home page before any code is written, so there are no surprises at the end. Once the design is signed off, most builds finish inside three to ten days, and you get a walkthrough of how to update the content yourself.",
      },
    ],
    related: ["/websites/web-design", "/websites/maintenance", "/websites/hosting"],
  },
  {
    slug: "ecommerce",
    eyebrow: "Ecommerce",
    h1: "Ecommerce website design in South Africa",
    lead: "Online stores wired into South African payment gateways, with stock, orders and shipping handled from one dashboard you can actually operate.",
    metaTitle: "Ecommerce Website Design South Africa | Online Stores from R5,500",
    metaDescription:
      "Ecommerce websites for South African businesses. PayFast, Yoco and Ozow integration, stock and order management, courier rates. Online stores from R5,500.",
    blocks: [
      {
        h: "Built for selling here",
        body: "An online store is only useful if South Africans can pay on it and couriers can deliver from it. We set up local gateways, real shipping rates, and a checkout that does not lose people on the last step.",
        points: [
          "PayFast, Yoco and Ozow integration",
          "Courier rates and delivery zones",
          "Stock levels, variants and back-orders",
          "Abandoned cart recovery",
        ],
      },
      {
        h: "From one shop to a marketplace",
        body: "Start with a single store and move to a multi-vendor marketplace when the business calls for it. We build both, and the migration path between them is planned from the beginning rather than bolted on.",
      },
    ],
    related: ["/ecommerce/online-stores", "/ecommerce/marketplaces", "/ecommerce/payments", "/ecommerce/b2b"],
  },
  {
    slug: "design",
    eyebrow: "Design",
    h1: "Brand and graphic design",
    lead: "A mark people remember, and the assets to use it everywhere — from your shopfront signage to your Instagram grid.",
    metaTitle: "Logo & Graphic Design Pretoria | Brand Identity from R450",
    metaDescription:
      "Logo design, brand identity, graphic design and motion for South African businesses. Vector files, social kit and unlimited revisions from R450.",
    blocks: [
      {
        h: "Identity first",
        body: "Before a website makes sense, you need a name people can see. We start with the mark, the colours and the type, then apply them consistently everywhere else.",
        points: [
          "Logo design with unlimited revisions",
          "Colour and typography system",
          "Vector source files you own outright",
          "Social media and stationery kit",
        ],
      },
      {
        h: "Everything after the logo",
        body: "Flyers, menus, vehicle branding, pitch decks, product photography treatments and short promo videos. Same team, same brand rules, so nothing drifts.",
      },
    ],
    related: ["/design/branding", "/design/graphic", "/design/motion", "/design/marketing"],
  },
  {
    slug: "development",
    eyebrow: "Development",
    h1: "Software and app development",
    lead: "Custom platforms, mobile apps and internal systems for when an off-the-shelf website cannot do what the business needs.",
    metaTitle: "App & Software Development South Africa | 6ixMedia SA",
    metaDescription:
      "Custom web applications, iOS and Android apps, booking systems and business software built in South Africa. Fixed scopes and milestone billing.",
    blocks: [
      {
        h: "When you need more than a website",
        body: "If your business runs on spreadsheets, WhatsApp threads and paper, software usually pays for itself faster than marketing does. We scope the smallest version that solves the real problem and build that first.",
        points: [
          "Customer and booking portals",
          "iOS and Android applications",
          "Internal tools and dashboards",
          "Integrations between systems you already use",
        ],
      },
      {
        h: "Scoped before it is priced",
        body: "Software goes wrong when nobody agrees what it does. We write the scope down, price it in milestones, and you approve each stage before the next one starts.",
      },
    ],
    related: ["/development/web-apps", "/development/mobile", "/development/software", "/development/portals"],
  },
  {
    slug: "platforms",
    eyebrow: "Platforms",
    h1: "Marketplace platforms, launch-ready",
    lead: "Pre-built marketplace systems we configure and brand for your business. Weeks to launch instead of months, at a fraction of custom build cost.",
    metaTitle: "Marketplace Software South Africa | Launch-Ready Platforms",
    metaDescription:
      "Ready-made multi-vendor marketplace, grocery, food delivery, tutoring, rental, services, ride-hailing and logistics platforms — branded and configured for you.",
    blocks: [
      {
        h: "Why start from a platform",
        body: "Building a marketplace from scratch takes six months and a large budget. These platforms already handle vendor onboarding, commissions, payouts, ratings and dispute flows — the unglamorous parts that take the longest.",
        points: [
          "Vendor sign-up, approval and storefronts",
          "Commission rules and automated payouts",
          "Customer apps for iOS and Android",
          "Admin dashboard with reporting",
        ],
      },
      {
        h: "Yours, not ours",
        body: "Each platform ships under your brand, on your domain, with your payment accounts. The names below are working titles — rename them to whatever you want to trade under.",
      },
    ],
    related: ["/platforms/vendra", "/platforms/freshlane", "/platforms/tablo", "/platforms/dispatch"],
  },
];

/* -------------------------------------------------------------- websites */

const websites: PageDoc[] = [
  {
    slug: "websites/web-design",
    parent: { label: "Websites", href: "/websites" },
    eyebrow: "Web design",
    h1: "Web design in Pretoria and across South Africa",
    lead: "A custom website built around how your business actually sells — not a template with your logo dropped into it.",
    metaTitle: "Web Design Pretoria | Custom Business Websites from R1,500",
    metaDescription:
      "Custom web design for South African businesses from R1,500. Mobile-first, search-ready, with 12 months hosting and a free domain included.",
    price: "From R1,500",
    priceNote: "Landing page. Business sites from R3,500.",
    blocks: [
      {
        h: "Designed for your business, not a category",
        body: "Template sites all solve the same imaginary business. Yours has a specific customer, a specific objection to overcome, and a specific reason people choose you over the competitor down the road. The design starts there.",
        points: [
          "Full home page design before any code is written",
          "Layouts built around your actual services and prices",
          "Copywriting help if you do not have text ready",
          "Unlimited revisions during the design stage",
        ],
      },
      {
        h: "Fast on a South African phone",
        body: "Most of your visitors arrive on mobile data, often outside a city. We build light pages, compress every image, and test on real devices rather than a resized browser window. A site that takes eight seconds to load has already lost the enquiry.",
      },
      {
        h: "Ready to be found",
        body: "Page titles, descriptions, heading structure, image alt text, a sitemap and structured data are set up at build time. We connect Google Analytics and Search Console, and submit the site so indexing starts immediately rather than whenever Google notices you.",
      },
    ],
    deliverables: [
      "Custom design, no templates",
      "Mobile, tablet and desktop layouts",
      "Contact form and WhatsApp button",
      "On-page SEO and structured data",
      "Google Analytics and Search Console",
      "12 months hosting and a free domain",
      "SSL certificate installed",
      "Handover training so you can edit it",
    ],
    faqs: [
      {
        q: "How much does a website cost in South Africa?",
        a: "A single-page site is R1,500 and a five-to-eight page business site is R3,500. Both include hosting and a domain for the first year, so there is nothing more to pay in year one.",
      },
      {
        q: "How long does the design take?",
        a: "Three to ten days for most websites once we have your content. Apps take two to three weeks. If you are working to a deadline, tell us early and we will build the schedule around it.",
      },
      {
        q: "Can I edit the site myself afterwards?",
        a: "Yes. We build on a content system you log into, and we walk you through the common changes at handover so you are not paying us to update a phone number.",
      },
    ],
    related: ["/websites/maintenance", "/websites/hosting", "/design/branding", "/ecommerce/online-stores"],
  },
  {
    slug: "websites/maintenance",
    parent: { label: "Websites", href: "/websites" },
    eyebrow: "Web maintenance",
    h1: "Website maintenance and care plans",
    lead: "Updates, backups, security patches and small content changes handled monthly, so your site does not quietly rot after launch.",
    metaTitle: "Website Maintenance South Africa | Care Plans from R450/month",
    metaDescription:
      "Monthly website maintenance for South African businesses. Backups, updates, security monitoring, uptime checks and content changes from R450 a month.",
    price: "R450 / month",
    priceNote: "Cancel any time, no lock-in contract.",
    blocks: [
      {
        h: "What actually breaks",
        body: "Sites rarely fail dramatically. A plugin updates and a form stops sending. An SSL certificate lapses and browsers start warning visitors away. Someone changes a price in one place and forgets the other three. Maintenance is mostly about catching these before a customer does.",
        points: [
          "Weekly off-site backups you can restore from",
          "Core, plugin and theme updates, tested",
          "Uptime monitoring with alerts",
          "Security scanning and malware cleanup",
        ],
      },
      {
        h: "Content changes included",
        body: "Every plan includes a monthly allowance of small changes — new prices, a staff photo, an updated trading hours notice. Send them on WhatsApp and they get done, without a quote for every line.",
      },
      {
        h: "Reporting you can read",
        body: "A short monthly note covering what was updated, what traffic looked like, and anything worth acting on. No forty-page automated PDF that nobody opens.",
      },
    ],
    deliverables: [
      "Weekly backups, stored off-site",
      "Software and security updates",
      "Uptime and SSL monitoring",
      "Monthly small content changes",
      "Performance checks",
      "Plain-language monthly report",
    ],
    faqs: [
      {
        q: "Do I have to take a care plan?",
        a: "No. It is optional and you can cancel any time. If you prefer, we handle changes as they come up and bill for the time.",
      },
      {
        q: "Can you maintain a site you did not build?",
        a: "Usually yes. Send us the link and login and we will audit it first, then tell you honestly whether it is worth maintaining or whether rebuilding is cheaper in the long run.",
      },
    ],
    related: ["/websites/hosting", "/websites/web-design", "/design/marketing"],
  },
  {
    slug: "websites/hosting",
    parent: { label: "Websites", href: "/websites" },
    eyebrow: "Hosting and domains",
    h1: "Website hosting and domain registration",
    lead: "Fast hosting, a domain in your own name, SSL and email — set up properly and renewed at cost.",
    metaTitle: "Website Hosting & Domain Registration South Africa | 6ixMedia SA",
    metaDescription:
      "Managed website hosting and domain registration for South African businesses. SSL, business email and 12 months included free with every website build.",
    price: "Included",
    priceNote: "First 12 months free with any website package.",
    blocks: [
      {
        h: "Registered in your name",
        body: "Your domain is registered to you, not to us. Too many small businesses discover years later that their previous developer owns the domain and wants paying to release it. That cannot happen here — you hold the account and we hold access only while you want us to.",
        points: [
          "co.za and international domain registration",
          "Hosting tuned for South African visitors",
          "Free SSL certificate, renewed automatically",
          "Business email on your own domain",
        ],
      },
      {
        h: "What happens after the free year",
        body: "Hosting and the domain renew at cost, quoted in writing before the year ends. There is no automatic upgrade, no bundled extra, and no penalty if you choose to move elsewhere.",
      },
    ],
    deliverables: [
      "Domain registered in your name",
      "Managed hosting with daily backups",
      "SSL certificate and auto-renewal",
      "Business email setup",
      "DNS configuration and migration",
    ],
    faqs: [
      {
        q: "Can you move my existing site to new hosting?",
        a: "Yes. Migrations are usually done overnight so there is no visible downtime, and we keep the old hosting live until we have confirmed everything works.",
      },
      {
        q: "What does renewal cost?",
        a: "It depends on the domain extension and how much traffic the site handles. We quote it before the free year is up, at cost, with no markup on the domain itself.",
      },
    ],
    related: ["/websites/maintenance", "/websites/web-design"],
  },
];

/* ------------------------------------------------------------- ecommerce */

const ecommerce: PageDoc[] = [
  {
    slug: "ecommerce/online-stores",
    parent: { label: "Ecommerce", href: "/ecommerce" },
    eyebrow: "Online stores",
    h1: "Online store design and development",
    lead: "A shop your customers can pay on and you can run — without phoning a developer to change a price.",
    metaTitle: "Online Store Design South Africa | Ecommerce from R5,500",
    metaDescription:
      "Custom online store design for South African businesses. PayFast, Yoco and Ozow, stock management, courier rates and order dashboard from R5,500.",
    price: "From R5,500",
    priceNote: "Includes 20 products loaded and one payment gateway.",
    blocks: [
      {
        h: "Set up to take money on day one",
        body: "We connect a South African payment gateway, configure delivery rates by area, load your first products properly with real descriptions, and test the whole path from browsing to confirmation email before handover.",
        points: [
          "PayFast, Yoco or Ozow connected and tested",
          "Delivery zones and courier rates",
          "First 20 products loaded with descriptions",
          "Order confirmation and shipping emails",
        ],
      },
      {
        h: "A dashboard you will actually use",
        body: "Stock levels, variants like size and colour, discount codes and order status all live in one place. We train you on it at handover, and there is a written guide for whoever else in the business needs to pack orders.",
      },
      {
        h: "Built to be found and to convert",
        body: "Product pages carry structured data so prices and stock can appear directly in Google results. Checkout is short, guest checkout is enabled by default, and abandoned cart emails can be switched on when you are ready.",
      },
    ],
    deliverables: [
      "Custom store design",
      "Payment gateway integration",
      "20 products loaded",
      "Delivery and courier rules",
      "Stock and variant management",
      "Product structured data for Google",
      "12 months hosting and free domain",
      "Handover training and written guide",
    ],
    faqs: [
      {
        q: "Which payment gateway should I use?",
        a: "PayFast is the usual default for South African stores. Yoco suits businesses that already take card payments in person, and Ozow works well for instant EFT. We can connect more than one.",
      },
      {
        q: "What if I have hundreds of products?",
        a: "We load them in bulk from a spreadsheet. Send us what you have and we will tell you what fields are missing before the build starts.",
      },
      {
        q: "Can I sell to customers outside South Africa?",
        a: "Yes. We configure international shipping rates and, where it makes sense, multi-currency display. Our China desk is useful if you are importing or exporting.",
      },
    ],
    related: ["/ecommerce/payments", "/ecommerce/marketplaces", "/ecommerce/retail", "/ecommerce/b2b"],
  },
  {
    slug: "ecommerce/marketplaces",
    parent: { label: "Ecommerce", href: "/ecommerce" },
    eyebrow: "Marketplaces",
    h1: "Multi-vendor marketplace development",
    lead: "Many sellers, one platform. Vendor onboarding, commissions, payouts and disputes handled from the start.",
    metaTitle: "Multi-Vendor Marketplace Development South Africa | From R18,000",
    metaDescription:
      "Build a multi-vendor marketplace in South Africa. Vendor storefronts, commission rules, automated payouts, ratings and admin dashboard from R18,000.",
    price: "From R18,000",
    priceNote: "Launch-ready platforms configured under your brand.",
    blocks: [
      {
        h: "The parts nobody thinks about",
        body: "A marketplace is not a shop with extra sellers. It needs vendor approval flows, split payments, commission rules, payout schedules, ratings on both sides, and a way to handle the order where the customer and the seller disagree. That machinery is what takes the time.",
        points: [
          "Vendor sign-up, verification and storefronts",
          "Commission by category, vendor or product",
          "Automated payouts and vendor statements",
          "Ratings, reviews and dispute handling",
        ],
      },
      {
        h: "Start from a platform, not a blank page",
        body: "We configure a proven marketplace system under your brand rather than writing one from scratch. You get to market in weeks, and the money you save goes into acquiring the vendors and customers that actually determine whether it works.",
      },
    ],
    deliverables: [
      "Branded marketplace on your domain",
      "Vendor onboarding and storefronts",
      "Commission and payout engine",
      "Customer and vendor dashboards",
      "Admin reporting",
      "Optional mobile apps",
    ],
    faqs: [
      {
        q: "How is this different from an online store?",
        a: "In a store you sell your own stock. In a marketplace other businesses list and sell, and you take a commission. The technical difference is mostly in payments, permissions and payouts.",
      },
      {
        q: "How long does a marketplace take to launch?",
        a: "Four to eight weeks for a configured platform, depending on how much customisation you need and how quickly content and vendor terms are ready.",
      },
    ],
    related: ["/platforms", "/platforms/vendra", "/ecommerce/online-stores", "/development/mobile"],
  },
  {
    slug: "ecommerce/b2b",
    parent: { label: "Ecommerce", href: "/ecommerce" },
    eyebrow: "Wholesale and B2B",
    h1: "Wholesale and B2B ecommerce",
    lead: "Trade portals where approved buyers see their own pricing, order in bulk, and stop phoning your sales team for a catalogue.",
    metaTitle: "B2B & Wholesale Ecommerce South Africa | Trade Portals",
    metaDescription:
      "B2B ecommerce and wholesale ordering portals for South African suppliers. Customer-specific pricing, bulk ordering, credit terms and repeat orders.",
    price: "From R12,000",
    blocks: [
      {
        h: "Trade pricing, done properly",
        body: "B2B buying works differently. Prices vary by customer, minimum quantities apply, and orders repeat monthly. A retail store layout fights all three. We build for the way your trade customers actually buy.",
        points: [
          "Customer-specific and tiered price lists",
          "Minimum order quantities and case packs",
          "Quick order by product code",
          "Repeat previous orders in one click",
        ],
      },
      {
        h: "Approval and account control",
        body: "New buyers apply, you approve them, and only then do they see trade pricing. Multiple users can sit under one account with different permissions, so a buyer can order while only a manager can approve credit.",
      },
    ],
    deliverables: [
      "Buyer application and approval flow",
      "Tiered and per-customer pricing",
      "Bulk and quick-order tools",
      "Order history and reordering",
      "Quote requests for large orders",
      "Integration with your stock system",
    ],
    faqs: [
      {
        q: "Can I hide prices from the public?",
        a: "Yes. A common setup shows the catalogue publicly but requires an approved login before any price is visible.",
      },
      {
        q: "Can it connect to my accounting system?",
        a: "In most cases yes, depending on what you use. Tell us the system and we will confirm before quoting.",
      },
    ],
    related: ["/ecommerce/online-stores", "/development/software", "/ecommerce/payments"],
  },
  {
    slug: "ecommerce/retail",
    parent: { label: "Ecommerce", href: "/ecommerce" },
    eyebrow: "Fashion and retail",
    h1: "Ecommerce for fashion and retail brands",
    lead: "Stores where the product photography does the selling, sizes and variants behave, and returns do not become a support nightmare.",
    metaTitle: "Fashion & Retail Ecommerce Design South Africa",
    metaDescription:
      "Online stores for South African fashion and retail brands. Size and colour variants, lookbooks, size guides, returns handling and Instagram integration.",
    price: "From R6,500",
    blocks: [
      {
        h: "Variants that do not fall over",
        body: "Fashion is where most store builds break. One product, five sizes, four colours, different stock in each combination, and a photo set per colour. We set the structure up correctly at the start so you are not fighting it every season.",
        points: [
          "Size, colour and material variants",
          "Per-variant stock and imagery",
          "Size guides and fit notes",
          "Back-in-stock notifications",
        ],
      },
      {
        h: "Made for browsing",
        body: "Retail buying is visual and unhurried. Lookbooks, collection pages, related products and a wishlist all keep people moving through the catalogue instead of bouncing off a grid of thumbnails.",
      },
    ],
    deliverables: [
      "Collection and lookbook pages",
      "Variant and stock structure",
      "Size guides",
      "Wishlist and related products",
      "Instagram feed integration",
      "Returns and exchange flow",
    ],
    related: ["/ecommerce/online-stores", "/design/branding", "/design/graphic"],
  },
  {
    slug: "ecommerce/payments",
    parent: { label: "Ecommerce", href: "/ecommerce" },
    eyebrow: "Payments",
    h1: "Payment gateway integration",
    lead: "PayFast, Yoco, Ozow and card payments connected, tested and reconciled — so money arrives and orders match.",
    metaTitle: "PayFast, Yoco & Ozow Integration | Payment Gateways South Africa",
    metaDescription:
      "South African payment gateway integration for online stores. PayFast, Yoco, Ozow, instant EFT, card payments, refunds and reconciliation.",
    price: "From R1,800",
    priceNote: "Included free with any new store build.",
    blocks: [
      {
        h: "Which gateway suits you",
        body: "There is no single best option. PayFast covers the widest range of methods, Yoco makes sense if you already take card payments in store, and Ozow is strong on instant EFT for customers who avoid cards. We will recommend based on what you sell and to whom.",
        points: [
          "PayFast for broad coverage",
          "Yoco for businesses already on Yoco terminals",
          "Ozow for instant EFT",
          "Multiple gateways side by side",
        ],
      },
      {
        h: "Tested end to end",
        body: "We run live test transactions before handover, including a refund, so you know the whole loop works. Failed payments return a clear message rather than dropping the customer on a blank page.",
      },
    ],
    deliverables: [
      "Gateway account setup assistance",
      "Live and sandbox testing",
      "Refund and partial refund flow",
      "Order and payment reconciliation",
      "Failure and retry handling",
    ],
    faqs: [
      {
        q: "Do I need a merchant account?",
        a: "Not usually. PayFast, Yoco and Ozow handle that side themselves, which is why they suit smaller businesses. We help you register if you have not already.",
      },
    ],
    related: ["/ecommerce/online-stores", "/ecommerce/b2b"],
  },
];

/* ---------------------------------------------------------------- design */

const design: PageDoc[] = [
  {
    slug: "design/branding",
    parent: { label: "Design", href: "/design" },
    eyebrow: "Brand identity",
    h1: "Logo design and brand identity",
    lead: "A mark that works at the size of a shopfront and the size of a favicon, with every file you need to use it.",
    metaTitle: "Logo Design Pretoria | Brand Identity from R450",
    metaDescription:
      "Custom logo design and brand identity for South African businesses. Unlimited revisions, vector source files, social media kit and brand guidelines from R450.",
    price: "From R450",
    priceNote: "Full identity pack R2,500.",
    blocks: [
      {
        h: "More than a picture",
        body: "A logo is one part of an identity. Without a colour palette, a type choice and rules for using them, a business ends up with five different-looking flyers and a website that matches none of them. We deliver the whole set.",
        points: [
          "Primary logo plus stacked and icon variants",
          "Colour palette with print and screen values",
          "Typography pairing for headings and body",
          "Usage rules your printer can follow",
        ],
      },
      {
        h: "Files you actually own",
        body: "You receive vector source files, not just a JPG. That means a signwriter can scale it to a building and an embroiderer can put it on a shirt without asking us for anything.",
      },
      {
        h: "Revised until it is right",
        body: "Unlimited revisions during the concept stage. We would rather spend an extra week than hand over a mark you are quietly unhappy with, because you will be looking at it for years.",
      },
    ],
    deliverables: [
      "Custom logo with variants",
      "Vector source files (AI, SVG, EPS)",
      "PNG and JPG exports for every use",
      "Favicon and app icon",
      "Colour and typography sheet",
      "Social media profile kit",
      "Brand guidelines document",
    ],
    faqs: [
      {
        q: "How many concepts do I see?",
        a: "Three distinct directions to start, then unlimited revisions on the one you choose. We do not charge for further rounds.",
      },
      {
        q: "Do I own the logo?",
        a: "Yes, completely, including the source files. We do not licence it back to you or charge for future use.",
      },
      {
        q: "How long does it take?",
        a: "Three to ten days including revision rounds, depending on how quickly feedback comes back.",
      },
    ],
    related: ["/design/graphic", "/websites/web-design", "/design/motion"],
  },
  {
    slug: "design/graphic",
    parent: { label: "Design", href: "/design" },
    eyebrow: "Graphic design",
    h1: "Graphic design for print and digital",
    lead: "Flyers, menus, signage, packaging, vehicle branding and social assets — all consistent with your identity.",
    metaTitle: "Graphic Design Pretoria | Print & Digital Design Services",
    metaDescription:
      "Graphic design for South African businesses. Flyers, menus, signage, vehicle branding, packaging and social media assets from R600 per asset.",
    price: "From R600",
    priceNote: "Per asset. Bundles available for regular work.",
    blocks: [
      {
        h: "Print-ready, properly",
        body: "Files go to the printer at the right size, in the right colour space, with bleed and crop marks. It sounds obvious, and it is the single most common reason a print job comes back wrong.",
        points: [
          "Flyers, posters and brochures",
          "Menus and price lists",
          "Signage and vehicle branding",
          "Packaging and labels",
        ],
      },
      {
        h: "Social assets that hold up",
        body: "Templates sized for each platform, built so you can swap the photo and the text yourself without the layout collapsing. Editable in Canva if that is what your team uses.",
      },
    ],
    deliverables: [
      "Print-ready PDFs with bleed",
      "Editable source files",
      "Social media templates",
      "Web-optimised exports",
    ],
    related: ["/design/branding", "/design/motion", "/design/marketing"],
  },
  {
    slug: "design/motion",
    parent: { label: "Design", href: "/design" },
    eyebrow: "Motion and video",
    h1: "Motion design and video production",
    lead: "Short promotional videos, animated logos and social clips that hold attention past the first second.",
    metaTitle: "Motion Design & Video Production South Africa",
    metaDescription:
      "Animated logos, promotional videos, social media clips and explainer animations for South African businesses from R2,500.",
    price: "From R2,500",
    blocks: [
      {
        h: "Built for the feed",
        body: "Video for social is watched muted, vertically, and abandoned in under two seconds. We design for that reality — subtitles by default, the hook at the front, and a version cut for each platform rather than one landscape file uploaded everywhere.",
        points: [
          "Animated logo stings",
          "Product and service promos",
          "Explainer animations",
          "Vertical cuts for Reels, TikTok and Shorts",
        ],
      },
      {
        h: "Working from what you have",
        body: "You do not always need a shoot. Existing photos, screen recordings and stock footage can carry a good promo, which keeps the cost down considerably.",
      },
    ],
    deliverables: [
      "Master video file",
      "Platform-specific cuts",
      "Burned-in subtitles",
      "Animated logo assets",
    ],
    related: ["/design/branding", "/design/marketing", "/design/graphic"],
  },
  {
    slug: "design/marketing",
    parent: { label: "Design", href: "/design" },
    eyebrow: "Marketing and SEO",
    h1: "SEO and digital marketing",
    lead: "Getting found by people already searching for what you sell, and staying visible once you are there.",
    metaTitle: "SEO Services Pretoria | Digital Marketing South Africa",
    metaDescription:
      "Local SEO, Google Business Profile optimisation, content and paid ads for South African businesses. SEO retainers from R2,500 a month.",
    price: "R2,500 / month",
    priceNote: "Once-off audits and setups also available.",
    blocks: [
      {
        h: "Local search first",
        body: "For most small businesses, the Google Business Profile matters more than the website. Getting the categories, service areas, photos and reviews right often moves the needle within weeks, and costs nothing but attention.",
        points: [
          "Google Business Profile setup and optimisation",
          "Local citations and directory listings",
          "Review generation process",
          "Location and service page structure",
        ],
      },
      {
        h: "Then the site itself",
        body: "Technical fixes, page speed, internal linking and a page for each service you want to rank for. One page cannot rank for thirty search terms, which is why service pages exist.",
      },
      {
        h: "Honest expectations",
        body: "SEO takes three to six months to show meaningful movement, and anyone promising page one in a fortnight is selling something else. We report on what actually changed and what it produced.",
      },
    ],
    deliverables: [
      "Technical SEO audit",
      "Keyword and competitor research",
      "On-page optimisation",
      "Google Business Profile management",
      "Monthly reporting",
      "Content recommendations",
    ],
    faqs: [
      {
        q: "How long until I rank?",
        a: "Local results can move in four to eight weeks. Competitive national terms take six months or more. We will tell you which category your targets fall into before you commit.",
      },
      {
        q: "Do you run Google and Facebook ads?",
        a: "Yes, as a separate service. Ads work well while SEO is still building, since they produce enquiries from day one.",
      },
    ],
    related: ["/websites/web-design", "/design/graphic", "/websites/maintenance"],
  },
];

/* ----------------------------------------------------------- development */

const development: PageDoc[] = [
  {
    slug: "development/web-apps",
    parent: { label: "Development", href: "/development" },
    eyebrow: "Web applications",
    h1: "Custom web application development",
    lead: "Platforms with logins, data and workflow — for when a website cannot do the job.",
    metaTitle: "Web Application Development South Africa | Custom Platforms",
    metaDescription:
      "Custom web application development in South Africa. Customer portals, dashboards, workflow tools and SaaS platforms with fixed scopes and milestone billing.",
    price: "From R35,000",
    blocks: [
      {
        h: "Where a website stops",
        body: "The line is usually the login. Once different users need to see different things, submit data and act on it, you are building an application rather than a site — and the two are priced and planned very differently.",
        points: [
          "Customer and staff portals",
          "Dashboards and reporting tools",
          "Workflow and approval systems",
          "Subscription and SaaS products",
        ],
      },
      {
        h: "Smallest useful version first",
        body: "Most failed software projects failed because they tried to do everything before anyone used any of it. We build the smallest version that solves the real problem, put it in front of users, and grow it from there.",
      },
    ],
    deliverables: [
      "Written scope and specification",
      "Interface design before build",
      "Milestone delivery",
      "Documentation and handover",
      "Optional support retainer",
    ],
    related: ["/development/software", "/development/mobile", "/development/portals"],
  },
  {
    slug: "development/mobile",
    parent: { label: "Development", href: "/development" },
    eyebrow: "Mobile apps",
    h1: "Mobile app development for iOS and Android",
    lead: "Apps built once and shipped to both stores, with the submission process handled for you.",
    metaTitle: "Mobile App Development South Africa | iOS & Android Apps",
    metaDescription:
      "iOS and Android app development for South African businesses. Cross-platform builds, App Store and Play Store submission, and ongoing support from R25,000.",
    price: "From R25,000",
    blocks: [
      {
        h: "One build, both stores",
        body: "Building separately for iOS and Android roughly doubles the cost. Unless you need something a cross-platform build genuinely cannot do, we write it once and ship to both, which is why the entry price is where it is.",
        points: [
          "iOS and Android from one codebase",
          "Push notifications",
          "Offline handling",
          "In-app payments where needed",
        ],
      },
      {
        h: "Store submission handled",
        body: "Apple and Google both reject apps for reasons that are not obvious the first time. We prepare the listings, screenshots, privacy declarations and age ratings, and deal with review feedback until it is approved.",
      },
      {
        h: "Do you actually need an app?",
        body: "Often the honest answer is no — a fast mobile website does the same job for a fraction of the price. Apps earn their cost when people use them repeatedly, need offline access, or require push notifications. We will say so if a website would serve you better.",
      },
    ],
    deliverables: [
      "iOS and Android builds",
      "App Store and Play Store submission",
      "Push notification setup",
      "Analytics and crash reporting",
      "Source code handover",
    ],
    faqs: [
      {
        q: "Do I need an Apple developer account?",
        a: "Yes, and a Google Play one. They are annual fees paid directly by you so the apps stay in your name. We walk you through setting them up.",
      },
      {
        q: "What about updates after launch?",
        a: "Both stores require periodic updates as operating systems change. We offer a support retainer, or you can come back as needed.",
      },
    ],
    related: ["/development/web-apps", "/platforms", "/development/portals"],
  },
  {
    slug: "development/software",
    parent: { label: "Development", href: "/development" },
    eyebrow: "Custom software",
    h1: "Custom software development",
    lead: "Internal systems that replace the spreadsheet everybody is scared to touch.",
    metaTitle: "Custom Software Development South Africa | Business Systems",
    metaDescription:
      "Custom business software development in South Africa. Inventory, scheduling, quoting and reporting systems, plus integrations between tools you already use.",
    price: "From R35,000",
    blocks: [
      {
        h: "The spreadsheet problem",
        body: "Most growing businesses run on one critical spreadsheet that only one person understands. It works until two people need it at once, or that person leaves. Replacing it is usually the highest-return software a small business can buy.",
        points: [
          "Inventory and stock systems",
          "Quoting and invoicing tools",
          "Scheduling and dispatch",
          "Reporting and business dashboards",
        ],
      },
      {
        h: "Integration over replacement",
        body: "You probably do not need to replace your accounting package. More often the win is connecting the systems you already pay for so data stops being retyped between them.",
      },
    ],
    deliverables: [
      "Discovery and written scope",
      "Milestone-based delivery",
      "User training",
      "Documentation",
      "Support options",
    ],
    related: ["/development/web-apps", "/ecommerce/b2b", "/development/portals"],
  },
  {
    slug: "development/portals",
    parent: { label: "Development", href: "/development" },
    eyebrow: "Booking and membership",
    h1: "Booking systems and membership portals",
    lead: "Online bookings, member areas and subscriptions — with payment and reminders handled automatically.",
    metaTitle: "Booking & Membership Systems South Africa | Online Scheduling",
    metaDescription:
      "Online booking systems, membership portals and subscription platforms for South African businesses. Calendar sync, payments, reminders and member content.",
    price: "From R15,000",
    blocks: [
      {
        h: "Bookings without the phone calls",
        body: "Customers book, pay a deposit, and get a reminder the day before. You get fewer no-shows and stop losing an hour a day to scheduling calls. For clinics, salons, studios and trades this is usually the fastest payback of any system we build.",
        points: [
          "Real-time availability and calendar sync",
          "Deposits and full payment at booking",
          "Automated SMS and email reminders",
          "Staff, resource and location scheduling",
        ],
      },
      {
        h: "Membership and subscriptions",
        body: "Gated content, recurring billing, member directories and renewal reminders. Useful for gyms, associations, training providers and anyone selling access rather than products.",
      },
    ],
    deliverables: [
      "Booking or membership platform",
      "Payment and recurring billing",
      "Automated reminders",
      "Admin dashboard",
      "Member or customer accounts",
    ],
    related: ["/development/web-apps", "/ecommerce/payments", "/development/software"],
  },
];

/* ------------------------------------------------------------- platforms */

type PlatformSeed = {
  slug: string;
  name: string;
  what: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  features: string[];
  audience: string;
};

const platformSeeds: PlatformSeed[] = [
  {
    slug: "vendra",
    name: "Vendra",
    what: "Multi-vendor ecommerce",
    h1: "Vendra — multi-vendor marketplace platform",
    lead: "Let other businesses sell on your platform while you take a commission on every order.",
    metaTitle: "Multi-Vendor Marketplace Software South Africa | Vendra",
    metaDescription:
      "Launch a multi-vendor ecommerce marketplace in South Africa. Vendor storefronts, commission rules, automated payouts and mobile apps, branded as your own.",
    features: [
      "Vendor registration, verification and storefronts",
      "Commission by category, vendor or product",
      "Automated payouts and vendor statements",
      "Product approval workflow",
      "Ratings and reviews on both sides",
      "Customer apps for iOS and Android",
    ],
    audience: "Anyone aggregating independent sellers — craft, electronics, agriculture, spares.",
  },
  {
    slug: "freshlane",
    name: "Freshlane",
    what: "Online grocery marketplace",
    h1: "Freshlane — online grocery marketplace platform",
    lead: "Multi-store grocery ordering with delivery slots, substitutions and picker workflows.",
    metaTitle: "Online Grocery Marketplace Software South Africa | Freshlane",
    metaDescription:
      "Launch an online grocery delivery marketplace. Multiple stores, delivery slots, substitutions, weight-based pricing and driver dispatch, under your brand.",
    features: [
      "Multiple stores with separate catalogues",
      "Delivery slot booking",
      "Weight and unit based pricing",
      "Substitution rules for out-of-stock items",
      "Picker and packer mobile workflow",
      "Driver dispatch and tracking",
    ],
    audience: "Grocers, butcheries, produce suppliers and township delivery services.",
  },
  {
    slug: "tablo",
    name: "Tablo",
    what: "Restaurant ordering and delivery",
    h1: "Tablo — restaurant ordering and delivery platform",
    lead: "Multi-restaurant food ordering with kitchen displays, driver dispatch and live tracking.",
    metaTitle: "Food Delivery App Software South Africa | Tablo",
    metaDescription:
      "Launch a multi-restaurant food ordering and delivery platform. Menus, kitchen display, driver app, live tracking and commission handling, under your brand.",
    features: [
      "Restaurant onboarding and menu management",
      "Modifiers, combos and add-ons",
      "Kitchen display and order acceptance",
      "Driver app with live tracking",
      "Delivery fees by distance",
      "Scheduled and pre-orders",
    ],
    audience: "Food delivery startups, restaurant groups and township delivery networks.",
  },
  {
    slug: "chalkline",
    name: "Chalkline",
    what: "Tutoring marketplace",
    h1: "Chalkline — online tutoring marketplace platform",
    lead: "Connect tutors and students, with scheduling, video lessons and payments in one place.",
    metaTitle: "Online Tutoring Marketplace Software | Chalkline",
    metaDescription:
      "Launch an online tutoring marketplace. Tutor profiles, subject search, lesson scheduling, video classes, payments and reviews, branded as your own.",
    features: [
      "Tutor profiles, subjects and rates",
      "Availability calendar and booking",
      "Built-in or integrated video lessons",
      "Lesson packages and credits",
      "Automated tutor payouts",
      "Reviews and progress notes",
    ],
    audience: "Tutoring agencies, training providers and education startups.",
  },
  {
    slug: "lendo",
    name: "Lendo",
    what: "Rental marketplace",
    h1: "Lendo — rental marketplace platform",
    lead: "Rent out anything by the hour, day or week, with deposits and availability handled automatically.",
    metaTitle: "Rental Marketplace Software South Africa | Lendo",
    metaDescription:
      "Launch a rental marketplace for equipment, vehicles, venues or tools. Availability calendars, deposits, damage claims and owner payouts, under your brand.",
    features: [
      "Availability calendars per item",
      "Hourly, daily and weekly rates",
      "Security deposits and holds",
      "Damage reporting and claims",
      "Collection and delivery options",
      "Owner payouts and statements",
    ],
    audience: "Equipment hire, party and event supplies, vehicles, venues and tools.",
  },
  {
    slug: "callout",
    name: "Callout",
    what: "On-demand services",
    h1: "Callout — on-demand services marketplace platform",
    lead: "Match customers with plumbers, cleaners, electricians and trades, with quotes and job tracking.",
    metaTitle: "On-Demand Services Marketplace Software | Callout",
    metaDescription:
      "Launch an on-demand services marketplace for trades and home services. Job posting, quotes, provider vetting, scheduling and payments under your brand.",
    features: [
      "Job posting and quote requests",
      "Provider vetting and documents",
      "Service areas and travel radius",
      "Scheduling and job status tracking",
      "In-app messaging",
      "Payment release on completion",
    ],
    audience: "Home services, trades directories and facilities management businesses.",
  },
  {
    slug: "waypoint",
    name: "Waypoint",
    what: "Ride hailing and taxi",
    h1: "Waypoint — ride hailing and taxi platform",
    lead: "A turnkey ride hailing system with driver and rider apps, fare rules and live dispatch.",
    metaTitle: "Taxi & Ride Hailing App Software South Africa | Waypoint",
    metaDescription:
      "Launch a ride hailing or taxi service. Rider and driver apps, live dispatch, fare calculation, trip tracking and driver payouts, branded as your own.",
    features: [
      "Rider and driver mobile apps",
      "Live dispatch and matching",
      "Distance and time based fares",
      "Trip tracking and share-my-ride",
      "Driver earnings and payouts",
      "Cash and card fare handling",
    ],
    audience: "Taxi associations, shuttle operators and regional ride hailing startups.",
  },
  {
    slug: "dispatch",
    name: "Dispatch",
    what: "Delivery and logistics",
    h1: "Dispatch — delivery and logistics platform",
    lead: "Manage a delivery fleet with route assignment, proof of delivery and live customer tracking.",
    metaTitle: "Delivery & Logistics App Software South Africa | Dispatch",
    metaDescription:
      "Launch a delivery and courier platform. Order intake, route assignment, driver app, proof of delivery and live tracking, branded as your own.",
    features: [
      "Order intake and bulk import",
      "Route assignment and optimisation",
      "Driver app with navigation",
      "Proof of delivery with photo and signature",
      "Live customer tracking links",
      "Fleet and performance reporting",
    ],
    audience: "Courier companies, last-mile delivery services and distribution businesses.",
  },
];

const platforms: PageDoc[] = platformSeeds.map((p) => ({
  slug: `platforms/${p.slug}`,
  parent: { label: "Platforms", href: "/platforms" },
  eyebrow: p.what,
  h1: p.h1,
  lead: p.lead,
  metaTitle: p.metaTitle,
  metaDescription: p.metaDescription,
  price: "From R18,000",
  priceNote: "Configured, branded and launched under your name.",
  blocks: [
    {
      h: "What is included",
      body: `${p.name} ships with the operational machinery already built, so the work is configuration and branding rather than development from zero.`,
      points: p.features,
    },
    {
      h: "Who it suits",
      body: `${p.audience} If that is roughly your model, a configured platform will get you trading months sooner than a custom build, and you can commission custom work later once you know what your users actually need.`,
    },
    {
      h: "Your brand, your accounts",
      body: `${p.name} is a working title. The platform launches on your domain, under your name, with your payment accounts and your commission structure. Nothing on it points back to us unless you want it to.`,
    },
  ],
  deliverables: [
    "Platform configured to your rules",
    "Your branding applied throughout",
    "Payment gateway connected",
    "Admin training and documentation",
    "Launch support",
    "Optional mobile apps",
  ],
  faqs: [
    {
      q: "Can I change the name?",
      a: `Yes — ${p.name} is our internal working title. You trade under whatever name you choose, on your own domain.`,
    },
    {
      q: "How long until launch?",
      a: "Four to eight weeks typically, depending on how much customisation you want and how quickly your content, terms and payment accounts are ready.",
    },
    {
      q: "Can it be customised later?",
      a: "Yes. Most clients launch with the standard configuration, learn what their users need, then commission specific changes once there is evidence for them.",
    },
  ],
  related: ["/platforms", "/ecommerce/marketplaces", "/development/mobile"],
}));

/* -------------------------------------------------------------- our work */

const work: PageDoc[] = [];

/* ------------------------------------------------------------------ misc */

const misc: PageDoc[] = [
  {
    slug: "about",
    eyebrow: "About",
    h1: "A design studio in Pretoria, working across two markets",
    lead: "6ixMedia SA builds websites, stores, brands and software for businesses that are still building themselves.",
    metaTitle: "About 6ixMedia SA | Web Design Studio in Pretoria",
    metaDescription:
      "6ixMedia SA is a web design and development studio based in Pretoria, South Africa, with a presence in China. Websites, ecommerce, branding and software.",
    blocks: [
      {
        h: "Who we work with",
        body: "Mostly startups and small businesses — the ones where the owner is still answering the phone. That shapes how we price, how we explain things, and why we will tell you when the cheaper option is the right one.",
      },
      {
        h: "Two countries, one team",
        body: "We are based in Pretoria and keep a presence in China. For most clients that simply means longer working coverage. For anyone importing, exporting or manufacturing, it means we understand both ends of the transaction and can build for both.",
      },
      {
        h: "How we price",
        body: "Once-off fees in rand, quoted before we start, with no retainer unless you want ongoing support. You own the domain, the hosting and the files, so leaving is always possible — which is the main reason nobody does.",
      },
    ],
    related: ["/quote", "/our-work", "/websites/web-design"],
  },
  {
    slug: "china-sourcing",
    eyebrow: "China sourcing",
    h1: "Need goods shipped from China? We handle it.",
    lead: "We already work across both markets. If you are buying from Chinese suppliers and want someone on the ground who speaks to them directly, talk to us.",
    metaTitle: "Shipping & Sourcing from China to South Africa | 6ixMedia SA",
    metaDescription:
      "Buying stock from China? 6ixMedia SA has a presence in both countries and can help South African businesses source suppliers and get goods shipped home.",
    blocks: [
      {
        h: "Why we can help with this",
        body: "Our studio runs across South Africa and China, which started as a way to cover longer working hours. In practice it means we already deal with Chinese suppliers, factories and freight agents week to week. If you are importing and want someone on that side who answers your messages, that is a service we can offer alongside the digital work.",
        points: [
          "Finding and vetting suppliers",
          "Talking to factories on your behalf",
          "Consolidating orders before they ship",
          "Arranging freight to South Africa",
        ],
      },
      {
        h: "Who this suits",
        body: "Mostly small retailers and online stores buying stock in modest volumes — the businesses too small for a dedicated import agent but large enough that mistakes hurt. If you have found a supplier on Alibaba and are not sure whether to trust them, that is exactly the moment to call us.",
      },
      {
        h: "How to start",
        body: "Send us what you are trying to buy, roughly how much of it, and where you are based. We will tell you honestly whether we can help, what it would cost, and how long it takes. If it is outside what we handle, we will say so rather than take the job and learn on your money.",
      },
    ],
    deliverables: [
      "Supplier search and vetting",
      "Direct communication with factories",
      "Sample coordination",
      "Order consolidation",
      "Freight arrangement to South Africa",
      "Updates in your working hours",
    ],
    faqs: [
      {
        q: "Do you handle customs clearance?",
        a: "We work with licensed clearing agents rather than clearing goods ourselves. Import duties, VAT and any product approvals remain your responsibility as the importer, and we will point you at the right people early rather than late.",
      },
      {
        q: "What size orders do you work with?",
        a: "Smaller consignments, typically for retailers and online stores buying stock. If you are moving full containers regularly, a dedicated freight forwarder will serve you better and we will say so.",
      },
      {
        q: "Is this separate from your web design work?",
        a: "Yes, it is a separate service, though plenty of clients use both — we build the online store and help stock it. Either works on its own.",
      },
    ],
    related: ["/ecommerce/online-stores", "/about", "/quote"],
  },
];

export const pages: PageDoc[] = [
  ...hubs,
  ...websites,
  ...ecommerce,
  ...design,
  ...development,
  ...platforms,
  ...work,
  ...misc,
];

export function getPage(slug: string) {
  return pages.find((p) => p.slug === slug);
}

export function pageTitle(p: PageDoc) {
  return p.metaTitle;
}
