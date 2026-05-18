import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { partnerLogos } from "./PartnerLogos";

const sponsors = partnerLogos.slice(0, 6);

export default function Sponsors() {
  return (
    <section className="relative py-10 sm:py-14 bg-white overflow-hidden">
      {/* Watermark — clamped to section width, no overflow */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black uppercase leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 12vw, 9rem)",
            color: "rgba(0,0,0,0.04)",
            letterSpacing: "0.1em",
          }}
        >
          SPONSORS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-saffron font-semibold text-xs sm:text-sm tracking-widest uppercase">
            Proudly Supported By
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-700 tracking-tight">
            THE WORLDWIDE PARTNERS
          </h2>
          <div className="section-divider mt-4 mx-auto" />
          <p className="mt-4 text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Our sponsors and partners make inclusive sport possible in India.
          </p>
        </div>

        {/* Sponsor logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="group bg-white border border-slate-200 rounded-xl p-2 sm:p-3 flex items-center justify-center min-h-[80px] sm:min-h-[90px] card-hover shadow-sm hover:border-saffron/40 transition-all"
              title={sponsor.name}
            >
              <div className="w-full h-12 sm:h-14">{sponsor.svg}</div>
            </div>
          ))}
        </div>

        {/* CTA link */}
        <div className="mt-7 sm:mt-8 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-saffron font-semibold hover:text-saffron-dark transition-colors group text-sm"
          >
            View All Partners &amp; Sponsors
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
