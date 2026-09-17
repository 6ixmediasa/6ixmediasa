"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/site";

const services = [
  "Website design",
  "Online store",
  "Logo and branding",
  "Mobile app",
  "Custom software",
  "SEO and marketing",
  "Marketplace platform",
  "Sourcing from China",
  "Not sure yet",
];

const budgets = ["Under R2,000", "R2,000 – R5,000", "R5,000 – R15,000", "R15,000+", "Need advice"];

const timelines = ["As soon as possible", "Within a month", "Fixed deadline", "Just exploring"];

export default function QuoteForm() {
  const [f, setF] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: services[0],
    budget: budgets[0],
    timeline: timelines[0],
    existing: "",
    detail: "",
  });
  const [touched, setTouched] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const valid = f.name.trim() !== "" && f.email.trim() !== "" && f.detail.trim() !== "";

  const body = [
    `Name: ${f.name}`,
    `Business: ${f.business || "—"}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "—"}`,
    ``,
    `Service: ${f.service}`,
    `Budget: ${f.budget}`,
    `Timeline: ${f.timeline}`,
    `Existing site: ${f.existing || "—"}`,
    ``,
    `About the project:`,
    f.detail,
  ].join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Quote request — ${f.business || f.name || "New enquiry"}`
  )}&body=${encodeURIComponent(body)}`;

  const wa = `https://wa.me/${site.whatsapp.za.intl}?text=${encodeURIComponent(body)}`;

  const send = (href: string) => {
    setTouched(true);
    if (!valid) return;
    window.location.href = href;
  };

  const field =
    "w-full rounded-lg border border-paper-edge bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-azure-400 focus:ring-2 focus:ring-azure-400/25";
  const label = "mb-2 block text-[13px] font-medium text-ink/70";
  const err = "mt-1.5 text-[12px] text-red-600";

  return (
    <div className="rounded-2xl border border-paper-edge bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="q-name">
            Your name <span className="text-azure-500">*</span>
          </label>
          <input id="q-name" className={field} value={f.name} onChange={set("name")} placeholder="Thabo Mokoena" />
          {touched && !f.name.trim() && <p className={err}>Please add your name.</p>}
        </div>
        <div>
          <label className={label} htmlFor="q-biz">
            Business name
          </label>
          <input id="q-biz" className={field} value={f.business} onChange={set("business")} placeholder="Mokoena Traders" />
        </div>
        <div>
          <label className={label} htmlFor="q-email">
            Email <span className="text-azure-500">*</span>
          </label>
          <input id="q-email" type="email" className={field} value={f.email} onChange={set("email")} placeholder="you@company.co.za" />
          {touched && !f.email.trim() && <p className={err}>We need an email to send the quote to.</p>}
        </div>
        <div>
          <label className={label} htmlFor="q-phone">
            Phone or WhatsApp
          </label>
          <input id="q-phone" className={field} value={f.phone} onChange={set("phone")} placeholder="061 234 5678" />
        </div>

        <div>
          <label className={label} htmlFor="q-service">
            What do you need?
          </label>
          <select id="q-service" className={field} value={f.service} onChange={set("service")}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="q-budget">
            Rough budget
          </label>
          <select id="q-budget" className={field} value={f.budget} onChange={set("budget")}>
            {budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="q-time">
            When do you need it?
          </label>
          <select id="q-time" className={field} value={f.timeline} onChange={set("timeline")}>
            {timelines.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="q-existing">
            Existing website
          </label>
          <input id="q-existing" className={field} value={f.existing} onChange={set("existing")} placeholder="yoursite.co.za, or leave blank" />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="q-detail">
            Tell us about the project <span className="text-azure-500">*</span>
          </label>
          <textarea
            id="q-detail"
            rows={5}
            className={field}
            value={f.detail}
            onChange={set("detail")}
            placeholder="What does your business do, who buys from you, and what do you want the site to achieve? A site you like the look of is useful too."
          />
          {touched && !f.detail.trim() && <p className={err}>A sentence or two is enough to price it.</p>}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-paper-edge pt-6">
        <button type="button" onClick={() => send(mailto)} className="btn-primary">
          <Icon name="mail" className="h-4 w-4" />
          Send by email
        </button>
        <button type="button" onClick={() => send(wa)} className="btn-ghost">
          <Icon name="whatsapp" className="h-4 w-4" />
          Send on WhatsApp
        </button>
        <p className="text-[13px] text-ink-mute">Opens your mail app or WhatsApp with everything filled in.</p>
      </div>
    </div>
  );
}
