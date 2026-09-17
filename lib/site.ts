export const site = {
  name: "6ixMedia SA",
  tagline: "If you can imagine it, we can design it.",
  email: "hello@6ixmediasa.com",
  whatsapp: {
    za: { label: "South Africa", number: "0615835380", intl: "27615835380" },
    cn: { label: "China", number: "13017817230", intl: "8613017817230" },
  },
  base: "Pretoria, South Africa",
  reach: "South Africa and China",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export type NavItem = { label: string; blurb: string; href: string; icon: string };
export type NavGroup = { label: string; href: string; items: NavItem[] };

export const nav: NavGroup[] = [
  {
    label: "Websites",
    href: "/websites",
    items: [
      { label: "Web design", blurb: "Custom business websites", href: "/websites/web-design", icon: "globe" },
      { label: "Web maintenance", blurb: "Care plans and updates", href: "/websites/maintenance", icon: "wrench" },
      { label: "Hosting and domains", blurb: "Setup and management", href: "/websites/hosting", icon: "server" },
    ],
  },
  {
    label: "Ecommerce",
    href: "/ecommerce",
    items: [
      { label: "Online stores", blurb: "Custom shop builds", href: "/ecommerce/online-stores", icon: "cart" },
      { label: "Multi-vendor marketplaces", blurb: "Many sellers, one platform", href: "/ecommerce/marketplaces", icon: "store" },
      { label: "Wholesale and B2B", blurb: "Bulk ordering portals", href: "/ecommerce/b2b", icon: "box" },
      { label: "Fashion and retail", blurb: "Stores for retail brands", href: "/ecommerce/retail", icon: "tag" },
      { label: "Payment integration", blurb: "PayFast, Yoco and Ozow", href: "/ecommerce/payments", icon: "card" },
      { label: "Sourcing from China", blurb: "We ship your goods to South Africa", href: "/china-sourcing", icon: "truck" },
    ],
  },
  {
    label: "Design",
    href: "/design",
    items: [
      { label: "Logo and brand identity", blurb: "Marks, colour and type", href: "/design/branding", icon: "palette" },
      { label: "Graphic design", blurb: "Print and digital assets", href: "/design/graphic", icon: "pen" },
      { label: "Motion and video", blurb: "Animation and promo edits", href: "/design/motion", icon: "play" },
      { label: "Marketing and SEO", blurb: "Search, social and ads", href: "/design/marketing", icon: "chart" },
    ],
  },
  {
    label: "Development",
    href: "/development",
    items: [
      { label: "Web applications", blurb: "Custom platforms", href: "/development/web-apps", icon: "code" },
      { label: "Mobile apps", blurb: "iOS and Android", href: "/development/mobile", icon: "phone" },
      { label: "Custom software", blurb: "Systems and tooling", href: "/development/software", icon: "cog" },
      { label: "Booking and membership", blurb: "Portals and scheduling", href: "/development/portals", icon: "users" },
    ],
  },
  {
    label: "Platforms",
    href: "/platforms",
    items: [
      { label: "Vendra", blurb: "Multi-vendor ecommerce", href: "/platforms/vendra", icon: "store" },
      { label: "Freshlane", blurb: "Online grocery marketplace", href: "/platforms/freshlane", icon: "cart" },
      { label: "Tablo", blurb: "Restaurant ordering and delivery", href: "/platforms/tablo", icon: "plate" },
      { label: "Chalkline", blurb: "Tutoring marketplace", href: "/platforms/chalkline", icon: "book" },
      { label: "Lendo", blurb: "Rental marketplace", href: "/platforms/lendo", icon: "key" },
      { label: "Callout", blurb: "On-demand services", href: "/platforms/callout", icon: "bolt" },
      { label: "Waypoint", blurb: "Ride hailing and taxi", href: "/platforms/waypoint", icon: "car" },
      { label: "Dispatch", blurb: "Delivery and logistics", href: "/platforms/dispatch", icon: "truck" },
    ],
  },
  {
    label: "Our work",
    href: "/our-work",
    items: [
      { label: "Portfolio", blurb: "Every project we have shipped", href: "/our-work", icon: "grid" },
      { label: "Pricing", blurb: "The full price list in rand", href: "/pricing", icon: "card" },
    ],
  },
];

export const services = [
  {
    title: "Web design",
    icon: "globe",
    body: "Custom sites built around how your business actually sells. Fast, mobile-first, and structured to rank from launch.",
    points: ["No templates", "SEO-ready structure", "12 months hosting included"],
    price: "From R1,500",
    href: "/websites/web-design",
  },
  {
    title: "Ecommerce",
    icon: "cart",
    body: "Online stores wired into South African payment gateways, with stock, orders and shipping handled from one dashboard.",
    points: ["PayFast, Yoco and Ozow", "Stock and order management", "Secure checkout"],
    price: "From R5,500",
    href: "/ecommerce/online-stores",
  },
  {
    title: "Brand and design",
    icon: "palette",
    body: "A mark people remember, delivered with vector files, mockups and everything you need for social from day one.",
    points: ["Vector source files", "Social media kit", "Unlimited revisions"],
    price: "From R450",
    href: "/design/branding",
  },
  {
    title: "Development",
    icon: "code",
    body: "Web apps, mobile apps and custom systems when an off-the-shelf site cannot do what your business needs.",
    points: ["iOS and Android", "Custom back ends", "Ongoing support"],
    price: "From R15,000",
    href: "/development/web-apps",
  },
];

export const platforms = [
  { name: "Vendra", what: "Multi-vendor ecommerce", icon: "store" },
  { name: "Freshlane", what: "Online grocery marketplace", icon: "cart" },
  { name: "Tablo", what: "Restaurant ordering and delivery", icon: "plate" },
  { name: "Chalkline", what: "Tutoring marketplace", icon: "book" },
  { name: "Lendo", what: "Rental marketplace", icon: "key" },
  { name: "Callout", what: "On-demand services", icon: "bolt" },
  { name: "Waypoint", what: "Ride hailing and taxi", icon: "car" },
  { name: "Dispatch", what: "Delivery and logistics", icon: "truck" },
];

export const pricing = [
  {
    name: "Logo",
    price: "R450",
    unit: "once-off",
    best: "Best for founders who need a mark before anything else",
    features: ["Custom logo design", "Unlimited revisions", "Vector source files", "Favicon and social kit"],
    featured: false,
  },
  {
    name: "Landing page",
    price: "R1,500",
    unit: "once-off",
    best: "Best for validating one offer or one campaign",
    features: ["Single-page site", "WhatsApp chat button", "12 months hosting", "Free domain for a year", "Contact form"],
    featured: false,
  },
  {
    name: "Business site",
    price: "R3,500",
    unit: "once-off",
    best: "Best for startups ready to be found on Google",
    features: ["Up to 5 pages", "Everything in Landing page", "On-page SEO setup", "Google Business profile", "Analytics installed"],
    featured: true,
  },
  {
    name: "Ecommerce",
    price: "R5,500",
    unit: "once-off",
    best: "Best for selling online from day one",
    features: ["Everything in Business site", "20 products loaded", "Payment gateway", "Shipping rules", "Order dashboard"],
    featured: false,
  },
];

export const addons = [
  { name: "Brand identity pack", price: "R1,800" },
  { name: "Ecommerce growth", price: "R3,500" },
  { name: "Website care plan", price: "R450 / month" },
  { name: "SEO retainer", price: "R1,500 / month" },
  { name: "Graphic design", price: "R200 / asset" },
  { name: "Motion and video", price: "R1,200" },
  { name: "Mobile app", price: "From R5,000" },
  { name: "Custom software", price: "From R35,000" },
  { name: "Marketplace platform", price: "From R8,000" },
];

export const process = [
  { step: "Talk", body: "A short call to understand what you sell and who buys it. No charge, no pressure." },
  { step: "Design", body: "You see a full design of the home page before a single line of code is written." },
  { step: "Build", body: "We build it, load your content, and test it on real phones, not just a browser resize." },
  { step: "Launch", body: "Domain, hosting and SSL handled. You get a walkthrough of how to update it yourself." },
];

export const whyUs = [
  { title: "Two markets, one team", body: "Based in Pretoria with a presence in China. If you import stock, we can help you source and ship it too." },
  { title: "Startup pricing", body: "Priced for businesses finding their feet, not for corporate procurement departments." },
  { title: "Delivered in days", body: "Most sites go live in three to ten days. Apps take two to three weeks, and we build to your deadline." },
  { title: "You own everything", body: "Your domain, your hosting, your files. No lock-in and no hostage situations." },
  { title: "Built to be found", body: "Structure, speed and metadata handled at build time rather than bolted on later." },
  { title: "We answer WhatsApp", body: "Message us on the number you already have. No ticket queue, no account manager." },
];

export const faqs = [
  { q: "How long does a website take?", a: "Most sites go live in three to ten days, and apps in two to three weeks. The clock starts when we have your content, not when you pay, so having your text and images ready is the fastest way to move. If you have a fixed deadline, tell us and we will build the schedule around it." },
  { q: "What do you need from me to start?", a: "Your logo if you have one, a short description of what you sell, any photos of your work or products, and your contact details. If you do not have copy written, we can draft it for you." },
  { q: "Do I own the website?", a: "Yes. The domain is registered in your name, the hosting account is yours, and you get the files. If you ever want to move to another provider, nothing stops you." },
  { q: "What happens after the free year of hosting?", a: "Hosting and the domain renew at cost, quoted upfront before the year is out. There is no surprise invoice and no forced upgrade." },
  { q: "Can you work with a business outside Pretoria?", a: "Most of our work is remote, across South Africa and into China. Calls, WhatsApp and email cover everything a site build needs." },
  { q: "Do you only build on WordPress?", a: "No. WordPress suits most small business sites because you can edit it yourself. For anything heavier we build custom, and we will tell you which one your project needs and why." },
  { q: "What are your payment terms?", a: "Half to start, half on launch. For larger builds we split it across milestones so you are never paying far ahead of the work." },
  { q: "What if I need changes after launch?", a: "Small tweaks in the first month are on us. After that, either take a care plan at R450 a month or pay for changes as you need them." },
];

export const testimonials = [
  { quote: "i started my electrical service company with 6ixMedia SA and have been growing stronger ever since.", name: "Client name", role: "TWise Electrical" },
  { quote: "6ix Media SA has never let me down and always keeps deadlines with my company documents", name: "Client name", role: "Khuliwe Holdings" },
  { quote: "6ixMedia SA has been keeping my company ranking on google since 2022", name: "Client name", role: "Ray&Sons Plumbers" },
];
