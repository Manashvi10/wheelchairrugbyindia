"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight, Trophy, Globe, Clock, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3">
      {boxes.map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white/10 border border-white/15 rounded-xl px-3 sm:px-5 py-3 min-w-[60px] backdrop-blur-sm"
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

const upcomingEvents = [
  {
    title: "WRFI National Championship 2026",
    date: "August 15 – 20, 2026",
    location: "Thyagaraj Sports Complex, New Delhi",
    description:
      "The premier national wheelchair rugby tournament featuring teams from 22+ states across India. Six days of intense competition.",
    status: "Registrations Open",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    featured: true,
  },
  {
    title: "Southern Regional Qualifiers",
    date: "June 10 – 12, 2026",
    location: "Kanteerava Indoor Stadium, Bengaluru",
    description:
      "Regional qualifier for southern states — Karnataka, Tamil Nadu, Kerala, Telangana, and Andhra Pradesh.",
    status: "Coming Soon",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    featured: false,
  },
  {
    title: "Wheelchair Rugby Awareness Week",
    date: "July 1 – 7, 2026",
    location: "Pan-India (Multiple Cities)",
    description:
      "A week-long campaign featuring open tryouts, school demonstrations, and community engagement in 10 cities.",
    status: "Planning Phase",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    featured: false,
  },
];

const nationalEvents = [
  {
    title: "1st National Championship",
    year: "2019",
    location: "New Delhi",
    teams: "8 State Teams",
    winner: "Maharashtra",
  },
  {
    title: "2nd National Championship",
    year: "2020",
    location: "Bengaluru",
    teams: "12 State Teams",
    winner: "Delhi",
  },
  {
    title: "3rd National Championship",
    year: "2022",
    location: "Chennai",
    teams: "16 State Teams",
    winner: "Punjab",
  },
  {
    title: "4th National Championship",
    year: "2023",
    location: "Hyderabad",
    teams: "18 State Teams",
    winner: "Maharashtra",
  },
  {
    title: "5th National Championship",
    year: "2024",
    location: "Kolkata",
    teams: "20 State Teams",
    winner: "Delhi",
  },
  {
    title: "6th National Championship",
    year: "2025",
    location: "Mumbai",
    teams: "22 State Teams",
    winner: "Upcoming",
  },
];

const internationalEvents = [
  {
    title: "Asia-Oceania Championship",
    year: "2024",
    location: "Bangkok, Thailand",
    result: "Participation & Experience",
    type: "Continental",
  },
  {
    title: "IWRF Development Tournament",
    year: "2024",
    location: "Dubai, UAE",
    result: "4th Place",
    type: "Development",
  },
  {
    title: "Asia-Oceania Qualifiers",
    year: "2025",
    location: "Tokyo, Japan",
    result: "Bronze Medal",
    type: "Qualifiers",
  },
  {
    title: "IWRF World Championship Qualifiers",
    year: "2026",
    location: "Sydney, Australia",
    result: "Qualified (Upcoming)",
    type: "World",
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Hero */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              Competitions
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Events &amp; <span className="gradient-text">Tournaments</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
              From national championships to international stages — the complete
              WRFI event calendar.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section className="py-16 sm:py-24 bg-navy relative overflow-hidden" id="upcoming">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-light/30 to-navy" />
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                What&apos;s Next
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Upcoming <span className="gradient-text">Tournaments</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
            </div>

            {/* Featured event with countdown */}
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white/5 border border-white/10 mb-10">
              <div className="relative h-[260px] sm:h-[340px] lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=800&q=80"
                  alt="Championship event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/30" />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-saffron text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Registrations Open
                </div>
              </div>
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  WRFI National Championship 2026
                </h3>
                <div className="flex flex-col gap-3 text-white/60 text-sm">
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-saffron shrink-0" />
                    August 15 – 20, 2026
                  </span>
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-saffron shrink-0" />
                    Thyagaraj Sports Complex, New Delhi
                  </span>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                    Event starts in
                  </p>
                  <Countdown />
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Other upcoming events */}
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents
                .filter((e) => !e.featured)
                .map((event, i) => (
                  <div
                    key={i}
                    className="card-hover p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${event.statusColor}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* National Events */}
        <section className="py-16 sm:py-24 bg-white" id="national">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                Across India
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                National <span className="gradient-text">Events</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                WRFI&apos;s national championship history — growing stronger every year.
              </p>
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
                  {nationalEvents.map((e, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-100 hover:bg-saffron/5 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
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
            <div className="mt-10 grid grid-cols-3 gap-6 p-8 rounded-2xl bg-slate-50 border border-slate-100">
              {[
                { icon: Calendar, value: "6", label: "Championships Held" },
                { icon: Users, value: "22+", label: "State Teams" },
                { icon: Trophy, value: "3", label: "Unique Winners" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="text-center">
                    <Icon className="w-6 h-6 text-saffron mx-auto mb-2" />
                    <p className="text-2xl sm:text-3xl font-black gradient-text">{s.value}</p>
                    <p className="text-slate-500 text-sm mt-1">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* International Events */}
        <section className="py-16 sm:py-24 bg-slate-50" id="international">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                Global Representation
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                International <span className="gradient-text">Events</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                India&apos;s participation and results on the international wheelchair
                rugby stage.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {internationalEvents.map((e, i) => (
                <div
                  key={i}
                  className="card-hover p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 relative overflow-hidden"
                >
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
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      {e.location}
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
      </main>
      <Footer />
    </>
  );
}
