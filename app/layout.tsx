import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://6ixmediasa.com"),
  title: {
    default: "Website design Pretoria | Sites from R1,500 | 6ixMedia SA",
    template: "%s",
  },
  description:
    "Web design, ecommerce and branding for South African startups. Pretoria based, working across South Africa and China. Sites from R1,500, hosting included.",
  keywords: [
    "website design Pretoria",
    "web design South Africa",
    "affordable website design",
    "ecommerce website South Africa",
    "logo design Pretoria",
    "startup website design",
  ],
  openGraph: {
    title: "Website design Pretoria | Sites from R1,500 | 6ixMedia SA",
    description: site.tagline,
    url: "https://6ixmediasa.com",
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
};


const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": "https://6ixmediasa.com/#org",
      name: site.name,
      url: "https://6ixmediasa.com/",
      slogan: site.tagline,
      description:
        "Website design and development studio in Pretoria, South Africa, building custom websites, online stores, brands and software for startups across South Africa and China.",
      email: site.email,
      telephone: `+${site.whatsapp.za.intl}`,
      priceRange: "R450 - R35000",
      currenciesAccepted: "ZAR",
      paymentAccepted: "EFT, Card, PayFast, Yoco, Ozow",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pretoria",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
      contactPoint: [
        { "@type": "ContactPoint", telephone: `+${site.whatsapp.za.intl}`, contactType: "sales", areaServed: "ZA", availableLanguage: ["en"] },
        { "@type": "ContactPoint", telephone: `+${site.whatsapp.cn.intl}`, contactType: "sales", areaServed: "CN", availableLanguage: ["en", "zh"] },
      ],
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "China" },
        { "@type": "City", name: "Pretoria" },
        { "@type": "City", name: "Johannesburg" },
        { "@type": "City", name: "Cape Town" },
        { "@type": "City", name: "Durban" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      knowsAbout: [
        "Website design",
        "Ecommerce development",
        "Logo design",
        "Search engine optimisation",
        "Mobile app development",
        "Multi-vendor marketplaces",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://6ixmediasa.com/#website",
      url: "https://6ixmediasa.com/",
      name: site.name,
      publisher: { "@id": "https://6ixmediasa.com/#org" },
      inLanguage: "en-ZA",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-azure-400 focus:px-4 focus:py-2 focus:text-azure-900"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
