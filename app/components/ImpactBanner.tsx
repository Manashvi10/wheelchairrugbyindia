"use client";

import { Calendar, ArrowRight } from "lucide-react";

export default function ImpactBanner() {
  return (
    <section className="relative py-6 sm:py-8 bg-gradient-to-r from-navy via-blue-accent to-india-green overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gold/10 rounded-full blur-3xl" />
      
      {/* Indian flag stars decoration */}
      <div className="absolute top-4 left-10 text-white/20 text-2xl">✦</div>
      <div className="absolute bottom-6 right-20 text-white/20 text-3xl">✦</div>
      <div className="absolute top-1/2 left-1/4 text-saffron/30 text-xl">★</div>
      <div className="absolute top-1/3 right-1/3 text-gold/30 text-2xl">★</div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Main announcement */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <span className="w-2 h-2 bg-saffron rounded-full animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                Historic Achievement
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
              The Indian Wheelchair Rugby Team is
              <br />
              heading to <span className="text-gold">Japan</span> for the{" "}
              <span className="text-saffron">2026</span>
            </h2>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold mb-2">
              Para Asian Games! 🇮🇳
            </p>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto md:mx-0">
              A proud moment for Indian wheelchair rugby as our athletes qualify
              to represent the nation on the international stage.
            </p>
          </div>

          {/* Right side - CTA button */}
          <div className="flex-shrink-0">
            <a
              href="/events"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white hover:bg-saffron text-navy hover:text-white font-bold rounded-2xl text-base sm:text-lg transition-all shadow-2xl hover:shadow-saffron/50 hover:scale-105"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>View Events</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
