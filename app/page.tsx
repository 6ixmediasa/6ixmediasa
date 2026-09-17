import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Platforms from "@/components/Platforms";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <Portfolio />
      <Platforms />
      <Process />
      <Pricing />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
