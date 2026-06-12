"use client";

import { Calendar, ArrowRight } from "lucide-react";

type AnnouncementData = {
  badge?: string; title?: string; highlight?: string; description?: string;
  btn_text?: string; btn_url?: string;
};

export default function ImpactBanner({ data }: { data?: unknown }) {
  const d = (data as AnnouncementData) ?? {};
  const badge = d.badge ?? "Historic Achievement";
  const title = d.title ?? "The Indian Wheelchair Rugby Team is heading to Japan for the 2026";
  const highlight = d.highlight ?? "Para Asian Games! 🇮🇳";
  const description = d.description ?? "A proud moment for Indian wheelchair rugby as our athletes qualify to represent the nation on the international stage.";
  const btnText = d.btn_text ?? "View Events";
  const btnUrl = d.btn_url ?? "/events";

  return (
    <section className="relative py-6 sm:py-8 bg-gradient-to-r from-navy via-blue-accent to-india-green overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-4 left-10 text-white/20 text-2xl">✦</div>
      <div className="absolute bottom-6 right-20 text-white/20 text-3xl">✦</div>
      <div className="absolute top-1/2 left-1/4 text-saffron/30 text-xl">★</div>
      <div className="absolute top-1/3 right-1/3 text-gold/30 text-2xl">★</div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <span className="w-2 h-2 bg-saffron rounded-full animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">{badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3">{title}</h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold mb-2">{highlight}</p>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={btnUrl}
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white hover:bg-saffron text-navy hover:text-white font-bold rounded-2xl text-base sm:text-lg transition-all shadow-2xl hover:shadow-saffron/50 hover:scale-105"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{btnText}</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
