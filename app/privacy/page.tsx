import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | 6ixMedia SA",
  description: "How 6ixMedia SA collects, uses and protects personal information, in line with South Africa's POPIA.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="August 2026"
      intro="This policy explains what personal information 6ixMedia SA collects, why we collect it, and what we do with it. It is written to align with the Protection of Personal Information Act (POPIA). We collect as little as we can and we do not sell it."
      sections={[
        {
          h: "What we collect",
          p: [
            "When you send an enquiry or request a quote, we collect the details you give us: your name, business name, email address, phone number, and whatever you tell us about your project.",
            "When you visit the site, our analytics collect anonymised technical information such as pages viewed, approximate location by country or city, device type and referring source.",
            "If you become a client, we also hold the information needed to deliver and invoice the work, including billing details and any content or account access you provide.",
          ],
        },
        {
          h: "Why we collect it",
          p: [
            "To reply to your enquiry and prepare a quote. To deliver work you have engaged us for. To invoice and keep accounting records as required by law. To understand which pages of our site are useful so we can improve them.",
            "We do not use your information for automated decision-making or profiling.",
          ],
        },
        {
          h: "Marketing",
          p: [
            "We only send marketing email to people who have asked to receive it or who are existing clients. Every marketing message includes an unsubscribe link that works immediately.",
            "Replying to an enquiry is not marketing, and asking for a quote does not add you to a mailing list.",
          ],
        },
        {
          h: "Who we share it with",
          p: [
            "We do not sell personal information, and we do not share it for advertising purposes.",
            "We use third-party service providers to run the business, including hosting providers, email providers, analytics and payment processors. They only receive what they need to perform their function.",
            "We may disclose information where we are legally required to do so.",
          ],
        },
        {
          h: "Where it is stored",
          p: [
            "Our website hosting and some service providers operate outside South Africa. Where information is transferred across borders, we use providers who offer a comparable level of protection to that required by POPIA.",
            "We operate between South Africa and China. Client project information may be accessible to our team in both locations.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "Enquiries that do not become projects are kept for up to 24 months, then deleted.",
            "Client records are kept for as long as we work together, and afterwards for the period required by South African tax and company law, which is generally five years.",
          ],
        },
        {
          h: "Cookies and analytics",
          p: [
            "The site uses cookies for basic functionality and for analytics that tell us how the site is used. Analytics data is aggregated and does not identify you personally.",
            "You can block or delete cookies in your browser settings. The site will still work.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You may ask us what personal information we hold about you, ask us to correct it if it is wrong, ask us to delete it, or object to us using it.",
            "To make any of these requests, email us and we will respond within a reasonable period. There is no charge for a reasonable request.",
            "If you are not satisfied with how we have handled your information, you may complain to the Information Regulator of South Africa.",
          ],
        },
        {
          h: "Security",
          p: [
            "We take reasonable technical and organisational steps to protect the information we hold, including encrypted connections and restricted access to client accounts.",
            "No system is completely secure. If a breach occurs that affects your personal information, we will notify you and the Information Regulator as required by law.",
          ],
        },
        {
          h: "Changes to this policy",
          p: [
            "We may update this policy as the business or the law changes. The date at the top of this page shows when it was last revised.",
          ],
        },
      ]}
    />
  );
}
