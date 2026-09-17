import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | 6ixMedia SA",
  description: "The terms under which 6ixMedia SA provides website design, development, branding and related services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      updated="August 2026"
      intro="These terms apply when you engage 6ixMedia SA for design, development or related work. They are written in plain language on purpose. If anything here is unclear, ask before you accept a quote rather than after."
      sections={[
        {
          h: "Quotes and scope",
          p: [
            "Every quote sets out what is included, the price in South African rand, and an expected delivery window. That price is fixed for the scope described in it.",
            "Work that falls outside the agreed scope is quoted separately before it starts. We do not add charges to an existing invoice without telling you first.",
            "Quotes are valid for 30 days from the date issued.",
          ],
        },
        {
          h: "Payment",
          p: [
            "Standard terms are 50% on acceptance of the quote, which reserves your slot in the schedule, and the balance on launch or delivery.",
            "Larger software projects are split across agreed milestones, each invoiced on completion of that stage.",
            "Monthly services such as care plans and SEO retainers are billed in advance and can be cancelled with 30 days notice.",
          ],
        },
        {
          h: "Timelines",
          p: [
            "Most websites and logo projects are delivered within three to ten working days. Mobile applications typically take two to three weeks. Larger builds are scheduled to milestones.",
            "Timelines start once we have the content we need from you, not on the date of payment. Delays in supplying content, feedback or approvals move the delivery date accordingly.",
            "Where you have a fixed external deadline, tell us before accepting the quote so we can confirm whether it is achievable.",
          ],
        },
        {
          h: "Your responsibilities",
          p: [
            "You are responsible for supplying accurate content, and for confirming that you hold the rights to any text, images, logos or other material you give us to use.",
            "You are responsible for reviewing the work at the stages we ask for feedback. Approval at a stage means we proceed on that basis.",
          ],
        },
        {
          h: "Revisions",
          p: [
            "Logo projects include unlimited revisions during the concept stage. Website projects include revisions during the design stage before development begins.",
            "Changes requested after final approval, or after launch, are quoted as new work. Minor corrections in the first 30 days after launch are not charged.",
          ],
        },
        {
          h: "Ownership and intellectual property",
          p: [
            "On final payment, ownership of the deliverables created specifically for you passes to you. This includes design files, logo source files and custom code written for your project.",
            "Domains are registered in your name. Hosting accounts are yours. You may move to another provider at any time and we will assist with the handover.",
            "Third-party components such as fonts, stock imagery, plugins and platform licences remain subject to their own licence terms. Where a licence is required, we tell you what it is and what it costs.",
            "We may display the work in our portfolio and marketing unless you ask us in writing not to.",
          ],
        },
        {
          h: "Hosting, domains and third-party services",
          p: [
            "Where a package includes hosting and a domain for the first year, renewal after that period is quoted to you at cost before the term ends.",
            "We are not responsible for outages, price changes or policy changes at third-party providers, including hosting companies, payment gateways, domain registrars and app stores.",
          ],
        },
        {
          h: "Cancellation",
          p: [
            "If you cancel after work has begun, the deposit covers work completed to that point and is not refundable. Any amount already invoiced for completed milestones remains payable.",
            "If we are unable to complete the work, we refund amounts paid for work not delivered.",
          ],
        },
        {
          h: "Liability",
          p: [
            "We take reasonable care in our work, but we do not warrant that a website will achieve particular search rankings, traffic levels, sales or business outcomes.",
            "Our total liability in connection with any project is limited to the amount you paid us for that project.",
            "We are not liable for indirect or consequential loss, including loss of profit, data or business opportunity.",
          ],
        },
        {
          h: "Governing law",
          p: [
            "These terms are governed by the laws of the Republic of South Africa, and the South African courts have jurisdiction over any dispute arising from them.",
            "We will always try to resolve a disagreement by talking about it first.",
          ],
        },
      ]}
    />
  );
}
