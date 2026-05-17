"use client";

import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const featured = [
  {
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    category: "Championship",
    date: "May 10, 2026",
    title: "WRFI National Championship 2026 — Registrations Now Open",
    excerpt:
      "The flagship national wheelchair rugby championship returns this August. Teams from 20+ states expected to compete in New Delhi.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?auto=format&fit=crop&w=800&q=80",
    category: "International",
    date: "April 28, 2026",
    title: "Team India Secures Historic Bronze At Asia-Oceania Qualifiers",
    excerpt:
      "A historic moment as India finishes third at the Asia-Oceania Championship, marking the best-ever international result.",
  },
];

const allNews = [
  {
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80",
    category: "Development",
    date: "April 22, 2026",
    title: "Grassroots Coaching Camp Reaches 5 New States",
    excerpt:
      "WRFI expands its coaching program to Assam, Jharkhand, Odisha, Chhattisgarh, and Himachal Pradesh, training 120 new players.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80",
    category: "Partnership",
    date: "April 15, 2026",
    title: "WRFI Signs Equipment Partnership With Global Sports Brand",
    excerpt:
      "A landmark deal ensures state-of-the-art rugby wheelchairs and gear for athletes across all national programs.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    category: "Athlete Spotlight",
    date: "April 8, 2026",
    title: "From Rehab To Rugby: Arjun Mehta's Inspiring Journey",
    excerpt:
      "National team athlete Arjun Mehta shares his journey from injury recovery to representing India on the global stage.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80",
    category: "Women In Sport",
    date: "March 30, 2026",
    title: "Women's Wheelchair Rugby Program Launches In 8 States",
    excerpt:
      "WRFI launches a dedicated women's development program aiming to field India's first women's national team by 2027.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=600&q=80",
    category: "Event",
    date: "March 22, 2026",
    title: "Southern Regional Qualifiers Set For June In Bengaluru",
    excerpt:
      "Karnataka, Tamil Nadu, Kerala, Telangana, and Andhra Pradesh teams to compete for national championship berths.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=600&q=80",
    category: "Achievement",
    date: "March 15, 2026",
    title: "WRFI Athletes Receive National Sports Awards Recognition",
    excerpt:
      "Three wheelchair rugby athletes honored with national awards for their outstanding contribution to para-sports in India.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519766304817-4f37bda5a4ea?auto=format&fit=crop&w=600&q=80",
    category: "Training",
    date: "March 8, 2026",
    title: "International Coaching Workshop Held In Mumbai",
    excerpt:
      "IWRF-certified coaches from Australia and Canada conduct intensive training workshop for 40 Indian coaches.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=600&q=80",
    category: "Community",
    date: "February 28, 2026",
    title: "Wheelchair Rugby Awareness Week Reaches 50,000 Students",
    excerpt:
      "Pan-India awareness campaign successfully introduces wheelchair rugby to students across 100+ schools in 10 cities.",
  },
];

const categoryColors: Record<string, string> = {
  Championship: "bg-saffron/10 text-saffron",
  International: "bg-blue-accent/10 text-blue-accent",
  Development: "bg-india-green/10 text-india-green",
  Partnership: "bg-gold/10 text-gold",
  "Athlete Spotlight": "bg-purple-100 text-purple-700",
  "Women In Sport": "bg-pink-100 text-pink-700",
  Event: "bg-cyan-100 text-cyan-700",
  Achievement: "bg-emerald-100 text-emerald-700",
  Training: "bg-indigo-100 text-indigo-700",
  Community: "bg-rose-100 text-rose-700",
};

const categories = [
  "All News",
  "Championship",
  "International",
  "Development",
  "Partnership",
  "Athlete Spotlight",
  "Women In Sport",
  "Event",
  "Achievement",
];

export default function NewsPage() {
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
              Stay Informed
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Latest <span className="gradient-text">News</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
              Updates, announcements, and inspiring stories from the world of
              wheelchair rugby in India.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* News Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div className="mb-12 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      i === 0
                        ? "bg-saffron text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured news — 2 large cards */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-navy mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-saffron rounded-full" />
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((item, i) => (
                  <article
                    key={i}
                    className="card-hover group rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden"
                  >
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                            categoryColors[item.category] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-xl sm:text-2xl mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {item.excerpt}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-saffron font-semibold text-sm hover:text-saffron-dark transition-colors group/link"
                      >
                        Read Full Story
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* All news grid */}
            <div>
              <h2 className="text-2xl font-black text-navy mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-accent rounded-full" />
                All News
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allNews.map((item, i) => (
                  <article
                    key={i}
                    className="card-hover group rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                            categoryColors[item.category] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-base sm:text-lg mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-saffron font-semibold text-xs hover:text-saffron-dark transition-colors group/link"
                        >
                          Read
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Load more */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-navy font-bold rounded-full transition-colors">
                Load More News
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-white text-lg mb-8">
              Subscribe to our newsletter for the latest news, events, and
              stories delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-saffron focus:ring-2 focus:ring-saffron/30 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full transition-all hover:shadow-xl hover:shadow-saffron/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
