"use client";

import { useState } from "react";
import Icon from "./Icon";

export type Doc = { label: string; file: string; note?: string };

export default function DocViewer({ docs }: { docs: Doc[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const doc = docs[active];

  return (
    <div>
      {docs.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {docs.map((d, i) => (
            <button
              key={d.file}
              type="button"
              onClick={() => {
                setActive(i);
                setOpen(false);
              }}
              aria-pressed={i === active}
              className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition ${
                i === active
                  ? "bg-ink text-white"
                  : "border border-paper-edge bg-white text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-paper-edge bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper-edge px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-azure-50 text-azure-600">
              <Icon name="file" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[15px] font-medium">{doc.label}</p>
              <p className="text-[13px] text-ink-mute">{doc.note ?? "PDF document"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {!open && (
              <button type="button" onClick={() => setOpen(true)} className="btn-ghost !px-4 !py-2 text-[13.5px]">
                <Icon name="file" className="h-4 w-4" />
                Preview
              </button>
            )}
            <a
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-4 !py-2 text-[13.5px]"
            >
              Open in new tab
            </a>
            <a href={doc.file} download className="btn-primary !px-4 !py-2 text-[13.5px]">
              Download
            </a>
          </div>
        </div>

        {open ? (
          <div className="bg-paper">
            <object data={`${doc.file}#view=FitH`} type="application/pdf" className="h-[70vh] w-full">
              <iframe src={`${doc.file}#view=FitH`} title={doc.label} className="h-[70vh] w-full border-0" />
            </object>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper-edge px-5 py-3">
              <p className="text-[13px] text-ink-mute">
                Not loading? Some browsers block embedded PDFs — use Open in new tab.
              </p>
              <button type="button" onClick={() => setOpen(false)} className="text-[13px] text-azure-600 hover:underline">
                Close preview
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full flex-col items-center justify-center gap-3 bg-paper px-6 py-16 transition hover:bg-azure-50"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-azure-500 shadow-sm">
              <Icon name="file" className="h-6 w-6" />
            </span>
            <span className="text-[15px] font-medium">Click to preview this document</span>
            <span className="max-w-sm text-center text-[13px] text-ink-mute">
              Opens in the page. You can also download it or open it in a new tab.
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
