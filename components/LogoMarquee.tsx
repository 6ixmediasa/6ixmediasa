/* Service ticker — replaces the old client logo strip.

   All styling is scoped CSS in this file. It uses no Tailwind classes and
   nothing from globals.css, so it renders correctly regardless of config.

   To change the services, edit SERVICES below. */

const SERVICES = [
  "Websites",
  "Online Stores",
  "Mobile Apps",
  "Logo Design",
  "Marketplaces",
  "SEO",
  "Custom Software",
  "Branding",
];

export default function LogoMarquee() {
  /* Four copies: the -50% shift spans two, which is wider than any
     monitor, so the loop point never shows a gap. */
  const row = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES];

  return (
    <section aria-label="What we do" className="svcTicker">
      <style>{`
.svcTicker{
  position:relative;
  overflow:hidden;
  padding:38px 0;
  border-top:1px solid #14364F;
  border-bottom:1px solid #14364F;
  background:linear-gradient(103deg,#061420 0%,#0A2C46 36%,#10476F 60%,#061420 100%);
}
.svcTicker__glow{
  position:absolute;
  top:50%; left:50%;
  width:960px; height:340px;
  transform:translate(-50%,-50%);
  border-radius:50%;
  background:radial-gradient(ellipse at center, rgba(41,169,224,.22), rgba(41,169,224,0) 66%);
  pointer-events:none;
}
.svcTicker__viewport{
  position:relative;
  -webkit-mask-image:linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%);
          mask-image:linear-gradient(to right, transparent 0, #000 9%, #000 91%, transparent 100%);
}
.svcTicker__track{
  display:flex;
  width:max-content;
  align-items:center;
  animation:svcTickerScroll 45s linear infinite;
}
.svcTicker:hover .svcTicker__track{ animation-play-state:paused; }
@keyframes svcTickerScroll{
  from{ transform:translateX(0); }
  to{ transform:translateX(-50%); }
}
.svcTicker__item{
  display:flex;
  align-items:center;
  flex-shrink:0;
}
.svcTicker__word{
  white-space:nowrap;
  padding:0 36px;
  font-family:var(--font-display), system-ui, sans-serif;
  font-size:34px;
  font-weight:500;
  letter-spacing:-0.02em;
  color:#B7D4E8;
}
.svcTicker__dot{
  width:7px; height:7px;
  flex-shrink:0;
  transform:rotate(45deg);
  background:#3FA9DC;
}
@media (max-width:640px){
  .svcTicker{ padding:28px 0; }
  .svcTicker__word{ font-size:24px; padding:0 24px; }
}
@media (prefers-reduced-motion:reduce){
  .svcTicker__track{ animation:none; }
}
      `}</style>

      <div className="svcTicker__glow" aria-hidden="true" />

      <div className="svcTicker__viewport">
        <div className="svcTicker__track">
          {row.map((word, i) => (
            <div className="svcTicker__item" key={`${word}-${i}`} aria-hidden={i >= SERVICES.length}>
              <span className="svcTicker__word">{word}</span>
              <span className="svcTicker__dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
