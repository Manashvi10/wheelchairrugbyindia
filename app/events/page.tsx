"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight, Trophy, Globe, Users, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface HeroData { eyebrow: string; title: string; description: string; enabled: boolean; }
interface UpcomingEvent {
  title: string; date: string; location: string; description: string; status: string;
  status_color: string; featured: boolean; image_url: string; countdown_date: string; register_url: string;
}
interface UpcomingData { eyebrow: string; title: string; events: UpcomingEvent[]; enabled: boolean; }
interface NationalRow { title: string; year: string; location: string; teams: string; winner: string; }
interface NationalData { eyebrow: string; title: string; description: string; rows: NationalRow[]; enabled: boolean; }
interface StatItem { icon: string; value: string; label: string; }
interface StatsData { stats: StatItem[]; enabled: boolean; }
interface InternationalEvent { title: string; year: string; location: string; result: string; type: string; }
interface InternationalData { eyebrow: string; title: string; description: string; events: InternationalEvent[]; enabled: boolean; }

const ICONS: Record<string, LucideIcon> = { Calendar, Users, Trophy, Globe, Star };

const STATUS_COLORS: Record<string, string> = {
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  red: "bg-red-50 text-red-700 border-red-200",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
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
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3">
      {boxes.map((b, i) => (
        <div key={i} className="flex flex-col items-center bg-white/10 border border-white/15 rounded-xl px-3 sm:px-5 py-3 min-w-[60px] backdrop-blur-sm">
          <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-white text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-1">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const DEFAULT_HERO: HeroData = {
  eyebrow: "Competitions",
  title: "Events & Tournaments",
  description: "From national championships to international stages — the complete WRFI event calendar.",
  enabled: true,
};
const DEFAULT_UPCOMING: UpcomingData = {
  eyebrow: "What's Next", title: "Upcoming Tournaments", enabled: true, events: [],
};
const DEFAULT_NATIONAL: NationalData = {
  eyebrow: "Across India", title: "National Events", description: "", enabled: true, rows: [],
};
const DEFAULT_STATS: StatsData = { enabled: true, stats: [] };
const DEFAULT_INTERNATIONAL: InternationalData = {
  eyebrow: "Global Representation", title: "International Events", description: "", enabled: true, events: [],
};

export default function EventsPage() {
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO);
  const [upcoming, setUpcoming] = useState<UpcomingData>(DEFAULT_UPCOMING);
  const [national, setNational] = useState<NationalData>(DEFAULT_NATIONAL);
  const [stats, setStats] = useState<StatsData>(DEFAULT_STATS);
  const [international, setInternational] = useState<InternationalData>(DEFAULT_INTERNATIONAL);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events-sections");
        const { sections } = await res.json();
        if (sections) {
          if (sections.hero?.data) setHero(sections.hero.data as HeroData);
          if (sections.upcoming?.data) setUpcoming(sections.upcoming.data as UpcomingData);
          if (sections.national?.data) setNational(sections.national.data as NationalData);
          if (sections.stats?.data) setStats(sections.stats.data as StatsData);
          if (sections.international?.data) setInternational(sections.international.data as InternationalData);
        }
      } catch (e) {
        console.error("Failed to load events sections:", e);
      }
    })();
  }, []);

  const featuredEvent = upcoming.events.find((e) => e.featured);
  const nonFeaturedEvents = upcoming.events.filter((e) => !e.featured);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Hero */}
        {hero.enabled && (
          <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
            <div className="pattern-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                {hero.eyebrow}
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                <span className="gradient-text">{hero.title}</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                {hero.description}
              </p>
              <div className="section-divider mt-6" />
            </div>
          </section>
        )}

        {/* Upcoming Tournaments */}
        {upcoming.enabled && (
          <section className="py-16 sm:py-24 bg-navy relative overflow-hidden" id="upcoming">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-navy" />
            <div className="pattern-overlay absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {upcoming.eyebrow}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <span className="gradient-text">{upcoming.title}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>

              {/* Featured event with countdown */}
              {featuredEvent && (
                <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-10">
                  <div className="relative h-[260px] sm:h-[340px] lg:h-auto">
                    {featuredEvent.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featuredEvent.image_url}
                        alt={featuredEvent.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/30" />
                    {featuredEvent.status && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        {featuredEvent.status}
                      </div>
                    )}
                  </div>
                  <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {featuredEvent.title}
                    </h3>
                    <div className="flex flex-col gap-3 text-white text-sm">
                      {featuredEvent.date && (
                        <span className="flex items-center gap-2.5">
                          <Calendar className="w-5 h-5 text-saffron shrink-0" />
                          {featuredEvent.date}
                        </span>
                      )}
                      {featuredEvent.location && (
                        <span className="flex items-center gap-2.5">
                          <MapPin className="w-5 h-5 text-saffron shrink-0" />
                          {featuredEvent.location}
                        </span>
                      )}
                    </div>
                    {featuredEvent.countdown_date && (
                      <div>
                        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
                          Event starts in
                        </p>
                        <Countdown targetISO={featuredEvent.countdown_date} />
                      </div>
                    )}
                    {featuredEvent.register_url && (
                      <a
                        href={featuredEvent.register_url}
                        className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
                      >
                        Register Now
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Other upcoming events */}
              {nonFeaturedEvents.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {nonFeaturedEvents.map((event, i) => (
                    <div key={i} className="card-hover p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${STATUS_COLORS[event.status_color] || STATUS_COLORS.blue}`}>
                          {event.status}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-white text-sm leading-relaxed mb-4">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-white">
                        {event.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {event.date}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* National Events */}
        {national.enabled && (
          <section className="py-16 sm:py-24 bg-white" id="national">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {national.eyebrow}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  <span className="gradient-text">{national.title}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
                {national.description && (
                  <p className="mt-6 text-lg text-slate-600 leading-relaxed">{national.description}</p>
                )}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Event</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Teams</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {national.rows.map((e, i) => (
                      <tr key={i} className={`border-b border-slate-100 hover:bg-saffron/5 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                        <td className="px-6 py-4 font-semibold text-navy text-sm">{e.title}</td>
                        <td className="px-6 py-4 text-saffron font-bold text-sm">{e.year}</td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{e.location}</td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{e.teams}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-saffron/10 text-saffron font-semibold rounded-full text-xs">
                            {e.winner}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* National stats */}
              {stats.enabled && stats.stats.length > 0 && (
                <div className="mt-10 grid grid-cols-3 gap-6 p-8 rounded-2xl bg-slate-50 border border-slate-100">
                  {stats.stats.map((s, i) => {
                    const Icon = ICONS[s.icon] || Calendar;
                    return (
                      <div key={i} className="text-center">
                        <Icon className="w-6 h-6 text-saffron mx-auto mb-2" />
                        <p className="text-2xl sm:text-3xl font-black gradient-text">{s.value}</p>
                        <p className="text-slate-500 text-sm mt-1">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* International Events */}
        {international.enabled && (
          <section className="py-16 sm:py-24 bg-slate-50" id="international">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {international.eyebrow}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  <span className="gradient-text">{international.title}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
                {international.description && (
                  <p className="mt-6 text-lg text-slate-600 leading-relaxed">{international.description}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {international.events.map((e, i) => (
                  <div key={i} className="card-hover p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron via-white to-india-green" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-accent/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-accent" />
                      </div>
                      <div>
                        <span className="text-blue-accent font-black text-sm block">{e.year}</span>
                        <span className="text-slate-400 text-xs">{e.type}</span>
                      </div>
                    </div>
                    <h3 className="text-navy font-bold text-lg mb-3">{e.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {e.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-saffron shrink-0" />
                        <span className="font-semibold text-navy">{e.result}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
