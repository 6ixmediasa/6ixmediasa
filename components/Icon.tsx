const paths: Record<string, string> = {
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3z",
  wrench: "M14.7 6.3a4 4 0 015.1 5.1l-8.4 8.4a2.1 2.1 0 01-3-3l8.4-8.4a1 1 0 00-1.3-1.5",
  server: "M4 5h16v5H4zM4 14h16v5H4zM7.5 7.5h.01M7.5 16.5h.01",
  cart: "M3 4h2l2.4 11.2a2 2 0 002 1.6h7.8a2 2 0 002-1.6L21 8H6M9 21h.01M17 21h.01",
  store: "M4 9V6a2 2 0 012-2h12a2 2 0 012 2v3M4 9h16l-1 11H5L4 9zM4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0",
  box: "M12 3l8 4.2v9.6L12 21l-8-4.2V7.2L12 3zM4 7.2l8 4.2 8-4.2M12 11.4V21",
  tag: "M4 4h7l9 9-7 7-9-9V4zM8 8h.01",
  card: "M3 6h18v12H3zM3 10h18M6.5 14.5h3",
  palette: "M12 3a9 9 0 000 18c1.2 0 1.8-.9 1.8-1.8 0-1.5 1-2.2 2.4-2.2h1.6A3.2 3.2 0 0021 13.8C21 7.9 16.9 3 12 3zM7.5 10.5h.01M11 7.5h.01M15.5 8.5h.01",
  pen: "M4 20l4-1 10-10a2.1 2.1 0 00-3-3L5 16l-1 4zM14 7l3 3",
  play: "M4 5h16v14H4zM10 9.5l5 2.5-5 2.5v-5z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  phone: "M7 3h10v18H7zM11 18.5h2",
  cog: "M12 9.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zM12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6",
  users: "M8 11a3.2 3.2 0 100-6.4A3.2 3.2 0 008 11zM2.5 20a5.5 5.5 0 0111 0M16 11.5a3 3 0 100-6 3 3 0 000 6zM15 15.2a5.5 5.5 0 016.5 4.8",
  plate: "M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 100 8 4 4 0 000-8z",
  book: "M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4V4zM20 4h-7a2 2 0 00-2 2v14a2 2 0 012-2h7V4z",
  key: "M15 4a5 5 0 11-3.6 8.5L4 20v-3h3v-3h3l1.4-1.4A5 5 0 0115 4zM16.5 7.5h.01",
  bolt: "M13 3L5 13h6l-1 8 8-10h-6l1-8z",
  car: "M5 16h14M6.5 16v2H4v-2M20 18h-2.5v-2M4 16l1.6-5.4A2 2 0 017.5 9h9a2 2 0 011.9 1.6L20 16H4zM7.5 13h.01M16.5 13h.01",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7zM7 19a1.6 1.6 0 100-3.2A1.6 1.6 0 007 19zM18 19a1.6 1.6 0 100-3.2A1.6 1.6 0 0018 19z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  browser: "M3 5h18v14H3zM3 9h18M6 7h.01M8.5 7h.01",
  file: "M6 3h8l4 4v14H6zM14 3v4h4",
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  star: "M12 4l2.4 5 5.6.8-4 4 .9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-4 5.6-.8L12 4z",
  whatsapp: "M4 20l1.4-4.1A7.6 7.6 0 1112 19.6a7.6 7.6 0 01-3.9-1.1L4 20zM9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4 1-.9v-.8l-1.8-.7-.8.9a4.6 4.6 0 01-2.4-2.4l.9-.8-.7-1.8h-.8c-.5 0-.9.4-.9 1z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4.2-4.2",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const d = paths[name] ?? paths.grid;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
