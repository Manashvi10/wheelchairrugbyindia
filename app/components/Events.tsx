"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const EVENT_DATE = new Date("2026-08-15T09:00:00+05:30");

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {boxes.map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white/10 border border-white/15 rounded-xl px-3 sm:px-5 py-3 min-w-[64px] backdrop-blur-sm"
        >
          <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-white/50 text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-1">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="py-20 sm:py-28 bg-navy relative overflow-hidden"
      aria-labelledby="events-heading"
    >
      <div className="pattern-overlay absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Upcoming Event
          </span>
          <h2
            id="events-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Next Big <span className="gradient-text">Tournament</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Featured event card */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
          {/* Poster / Image */}
          <div className="relative h-[280px] sm:h-[360px] lg:h-auto">
            <img
              src="/images/up.png"
              alt="Wheelchair rugby championship poster"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/30" />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-full uppercase tracking-wider">
              Registrations Open
            </div>
          </div>

          {/* Event details */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              WRFI National Wheelchair Rugby Championship 2026
            </h3>

            <div className="flex flex-col gap-3 text-white/60">
              <span className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-saffron shrink-0" />
                <span>August 15 – 20, 2026</span>
              </span>
              <span className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-saffron shrink-0" />
                <span>Thyagaraj Sports Complex, New Delhi</span>
              </span>
            </div>

            <p className="text-white/50 leading-relaxed">
              The premier national wheelchair rugby tournament featuring teams
              from across India. Six days of intense competition, skill
              showcases, and an inclusive sports festival.
            </p>

            {/* Countdown */}
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                Event starts in
              </p>
              <Countdown />
            </div>

            {/* Register button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
