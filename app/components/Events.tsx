"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

type UpcomingEvent = {
  title: string; date: string; location: string; description: string;
  status: string; featured: boolean; image_url: string;
  countdown_date: string; register_url: string;
};

const DEFAULT_EVENT: UpcomingEvent = {
  title: "WRFI National Wheelchair Rugby Championship 2026",
  date: "May 15 – 18, 2026",
  location: "Thyagaraj Sports Complex, New Delhi",
  description:
    "The premier national wheelchair rugby tournament featuring teams from across India. Six days of intense competition, skill showcases, and an inclusive sports festival.",
  status: "Registrations Open",
  featured: true,
  image_url: "/images/up.png",
  countdown_date: "2026-08-15T09:00:00+05:30",
  register_url: "#contact",
};

function Countdown({ targetISO }: { targetISO: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
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
  }, [targetISO]);

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
          className="flex flex-col items-center bg-white border border-slate-200 rounded-xl px-3 sm:px-5 py-3 min-w-[64px] shadow-sm"
        >
          <span className="text-2xl sm:text-3xl font-black text-navy tabular-nums">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-1">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const [event, setEvent] = useState<UpcomingEvent>(DEFAULT_EVENT);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events-sections", { cache: "no-store" });
        const { sections } = await res.json();
        const events = (sections?.upcoming?.data?.events ?? []) as UpcomingEvent[];
        if (events.length) {
          const featured = events.find((e) => e.featured) ?? events[0];
          setEvent({ ...DEFAULT_EVENT, ...featured });
        }
      } catch {
        /* keep default */
      }
    })();
  }, []);

  return (
    <section
      id="events"
      className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden"
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
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            Next Big <span className="gradient-text">Tournament</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Featured event card */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg">
          {/* Poster / Image */}
          <div className="relative h-[280px] sm:h-[360px] lg:h-auto">
            <img
              src={event.image_url || "/images/up.png"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/30" />
            {event.status && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-full uppercase tracking-wider">
                {event.status}
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5 overflow-hidden">
            <h3 className="text-xl sm:text-3xl font-black text-navy leading-tight">
              {event.title}
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">
              <span className="flex items-center gap-2.5 min-w-0">
                <Calendar className="w-5 h-5 text-saffron shrink-0" />
                <span className="truncate">{event.date}</span>
              </span>
              <span className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-5 h-5 text-saffron shrink-0" />
                <span className="truncate sm:whitespace-normal">{event.location}</span>
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {event.description}
            </p>

            {/* Countdown */}
            {event.countdown_date && (
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
                  Event starts in
                </p>
                <Countdown targetISO={event.countdown_date} />
              </div>
            )}

            {/* Register button */}
            <a
              href={event.register_url || "#contact"}
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
