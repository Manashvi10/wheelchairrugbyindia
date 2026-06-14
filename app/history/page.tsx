"use client";

import { Flag, Globe, Trophy, Medal, Star, Award, MapPin, Calendar } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const iconMap: Record<string, typeof Flag> = {
  Flag,
  Globe,
  Trophy,
  Medal,
  Star,
  Award,
};

const colorMap: Record<string, string> = {
  saffron: "bg-saffron",
  blue: "bg-blue-accent",
  green: "bg-india-green",
  gold: "bg-gold",
  "bg-saffron": "bg-saffron",
  "bg-blue-accent": "bg-blue-accent",
  "bg-india-green": "bg-india-green",
  "bg-gold": "bg-gold",
};

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface TimelineData {
  eyebrow: string;
  title: string;
  entries: TimelineEntry[];
  enabled: boolean;
}


const paraNationals = [
  {
    event: "1st National Wheelchair Rugby Championship",
    year: "2019",
    location: "New Delhi",
    result: "8 State Teams — Maharashtra Gold",
  },
  {
    event: "2nd National Wheelchair Rugby Championship",
    year: "2020",
    location: "Bengaluru",
    result: "12 State Teams — Delhi Gold",
  },
  {
    event: "3rd National Wheelchair Rugby Championship",
    year: "2022",
    location: "Chennai",
    result: "16 State Teams — Punjab Gold",
  },
  {
    event: "4th National Wheelchair Rugby Championship",
    year: "2023",
    location: "Hyderabad",
    result: "18 State Teams — Maharashtra Gold",
  },
  {
    event: "5th National Wheelchair Rugby Championship",
    year: "2024",
    location: "Kolkata",
    result: "20 State Teams — Delhi Gold",
  },
  {
    event: "6th National Wheelchair Rugby Championship",
    year: "2025",
    location: "Mumbai",
    result: "22 State Teams — Results Pending",
  },
];

const paraInternationals = [
  {
    event: "Asia-Oceania Wheelchair Rugby Championship",
    year: "2024",
    location: "Bangkok, Thailand",
    result: "Team India — Participation & Experience",
  },
  {
    event: "IWRF Development Tournament",
    year: "2024",
    location: "Dubai, UAE",
    result: "Team India — 4th Place",
  },
  {
    event: "Asia-Oceania Qualifiers",
    year: "2025",
    location: "Tokyo, Japan",
    result: "Team India — Bronze Medal",
  },
  {
    event: "IWRF World Championship Qualifiers",
    year: "2026",
    location: "Sydney, Australia",
    result: "Team India — Qualified (Upcoming)",
  },
];

export default function HistoryPage() {
  const [heroData, setHeroData] = useState<HeroData>({
    eyebrow: "Our Legacy",
    title: "Our History & Achievements",
    description: "From 1977 to today — the story of wheelchair rugby and India's remarkable journey in the sport.",
    enabled: true,
  });
  const [timelineData, setTimelineData] = useState<TimelineData>({
    eyebrow: "Milestones",
    title: "The Journey of Wheelchair Rugby",
    entries: [
      {
        year: "1977",
        title: "Sport Invented",
        description: "Wheelchair rugby was invented in Winnipeg, Canada by quadriplegic athletes seeking an inclusive competitive sport.",
        icon: "Flag",
        color: "saffron",
      },
      {
        year: "1993",
        title: "IWRF Established",
        description: "The International Wheelchair Rugby Federation was formed to govern the sport globally.",
        icon: "Globe",
        color: "blue",
      },
      {
        year: "1996",
        title: "Paralympic Debut",
        description: "Wheelchair rugby featured as a demonstration sport at the Atlanta Paralympics.",
        icon: "Trophy",
        color: "green",
      },
      {
        year: "2000",
        title: "Full Medal Sport",
        description: "Became an official medal sport at the Sydney 2000 Paralympic Games.",
        icon: "Medal",
        color: "gold",
      },
      {
        year: "2009",
        title: "Introduced in India",
        description: "Wheelchair rugby was introduced in India, igniting a new chapter in Indian para-sports history.",
        icon: "Flag",
        color: "saffron",
      },
      {
        year: "2019",
        title: "WRFI Established",
        description: "Wheelchair Rugby Federation of India was officially formed as the national governing body.",
        icon: "Star",
        color: "blue",
      },
      {
        year: "2024",
        title: "International Debut",
        description: "Team India competed in its first international wheelchair rugby tournament on the global stage.",
        icon: "Globe",
        color: "green",
      },
    ],
    enabled: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hero from history_sections
        const heroRes = await fetch("/api/history-sections");
        const { sections } = await heroRes.json();
        if (sections && sections.hero && sections.hero.data) {
          setHeroData(sections.hero.data as HeroData);
        }

        // Timeline from shared cms/timeline (same source as home admin)
        const tlRes = await fetch("/api/cms/timeline");
        const tlJson = await tlRes.json();
        if (tlJson && tlJson.data) {
          if (Array.isArray(tlJson.data)) {
            // legacy array format
            setTimelineData((prev) => ({
              ...prev,
              entries: tlJson.data as TimelineEntry[],
              enabled: tlJson.is_enabled !== false,
            }));
          } else if (typeof tlJson.data === "object") {
            const d = tlJson.data as Partial<TimelineData> & { entries?: TimelineEntry[] };
            setTimelineData({
              eyebrow: d.eyebrow || "Milestones",
              title: d.title || "The Journey of Wheelchair Rugby",
              entries: d.entries && d.entries.length ? d.entries : [],
              enabled: tlJson.is_enabled !== false,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch history sections:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Hero */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            {heroData.enabled && (
              <>
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {heroData.eyebrow}
                </span>
                <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  <span className="gradient-text">{heroData.title}</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                  {heroData.description}
                </p>
              </>
            )}
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Timeline Section */}
        {timelineData.enabled && (
          <section className="py-16 sm:py-24 bg-white" id="timeline">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {timelineData.eyebrow}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  <span className="gradient-text">{timelineData.title}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
                <div className="space-y-10">
                  {timelineData.entries.map((m, i) => {
                    const Icon = iconMap[m.icon] || Flag;
                    const colorClass = colorMap[m.color] || "bg-saffron";
                    return (
                      <div key={i} className="relative flex gap-6 sm:gap-8 items-start">
                        <div className="relative z-10 shrink-0">
                          <div
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colorClass} flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        <div className="card-hover flex-1 p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-saffron font-black text-sm">{m.year}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
                            {m.title}
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Para Nationals Achievements */}
        <section className="py-16 sm:py-24 bg-navy relative overflow-hidden" id="para-nationals">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                National Glory
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Our Achievements —{" "}
                <span className="gradient-text">Para Nationals</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
              <p className="mt-6 text-lg text-white leading-relaxed">
                A record of excellence at the National Wheelchair Rugby Championships
                organized by WRFI across India.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paraNationals.map((item, i) => (
                <div
                  key={i}
                  className="card-hover p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-saffron/20 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-saffron" />
                    </div>
                    <span className="text-saffron font-black">{item.year}</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                    {item.event}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4 text-white shrink-0" />
                      {item.location}
                    </p>
                    <p className="flex items-center gap-2 text-white">
                      <Award className="w-4 h-4 text-white shrink-0" />
                      {item.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para Internationals Achievements */}
        <section className="py-16 sm:py-24 bg-white" id="para-internationals">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                Global Stage
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                Our Achievements —{" "}
                <span className="gradient-text">Para Internationals</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                India&apos;s growing presence on the international wheelchair rugby
                stage — competing, learning, and earning respect worldwide.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {paraInternationals.map((item, i) => (
                <div
                  key={i}
                  className="card-hover p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron via-gold to-india-green" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-accent/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-accent" />
                    </div>
                    <span className="text-blue-accent font-black">{item.year}</span>
                  </div>
                  <h3 className="text-navy font-bold text-base sm:text-lg mb-3">
                    {item.event}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      {item.location}
                    </p>
                    <p className="flex items-center gap-2 text-slate-500">
                      <Medal className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-navy">{item.result}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary strip */}
            <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy to-navy-light text-center relative overflow-hidden">
              <div className="pattern-overlay absolute inset-0" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  India is on the Rise
                </h3>
                <p className="text-white max-w-2xl mx-auto mb-6">
                  From our first international appearance to earning medals — the
                  journey has just begun. Support Team India as we aim for the
                  Paralympic Games.
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    { value: "4+", label: "International Events" },
                    { value: "1", label: "Bronze Medal" },
                    { value: "2026", label: "World Qualifiers" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-3xl font-black gradient-text">{s.value}</p>
                      <p className="text-white text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
