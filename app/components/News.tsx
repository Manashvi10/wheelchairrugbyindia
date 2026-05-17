import { ArrowUpRight } from "lucide-react";

const featured = [
  {
    image:
      "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80",
    category: "Championship",
    title: "WRFI National Championship 2026 — Registrations Now Open",
    excerpt:
      "The flagship national wheelchair rugby championship returns this August. Teams from 20+ states expected to compete in New Delhi.",
  },
  {
    image:
      "/images/g5.jpg",
    category: "International",
    title: "Team India Secures Historic Bronze At Asia-Oceania Qualifiers",
    excerpt:
      "A historic moment as India finishes third at the Asia-Oceania Championship, marking the best-ever international result.",
  },
];

const news = [
  {
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80",
    category: "Development",
    title: "Grassroots Coaching Camp Reaches 5 New States",
    excerpt:
      "WRFI expands its coaching program to Assam, Jharkhand, Odisha, Chhattisgarh, and Himachal Pradesh.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=600&q=80",
    category: "Partnership",
    title: "WRFI Signs Equipment Partnership With Global Sports Brand",
    excerpt:
      "A landmark deal ensures state-of-the-art rugby wheelchairs and gear for athletes across all national programs.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
    category: "Athlete Spotlight",
    title: "From Rehab To Rugby: Arjun Mehta\u2019s Inspiring Journey",
    excerpt:
      "National team athlete Arjun Mehta shares his journey from injury recovery to representing India on the global stage.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80",
    category: "Women In Sport",
    title: "Women\u2019s Wheelchair Rugby Program Launches In 8 States",
    excerpt:
      "WRFI launches a dedicated women\u2019s development program aiming to field India\u2019s first women\u2019s national team by 2027.",
  },
];

const categoryColors: Record<string, string> = {
  Championship: "bg-saffron/10 text-saffron",
  International: "bg-blue-accent/10 text-blue-accent",
  Development: "bg-india-green/10 text-india-green",
  Partnership: "bg-gold/10 text-gold",
  "Athlete Spotlight": "bg-purple-100 text-purple-700",
  "Women In Sport": "bg-pink-100 text-pink-700",
};

export default function News() {
  return (
    <section
      id="news"
      className="py-20 sm:py-28 bg-slate-50"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              Stay Updated
            </span>
            <h2
              id="news-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
            >
              Latest <span className="gradient-text">News</span>
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-saffron font-semibold hover:text-saffron-dark transition-colors group shrink-0"
          >
            View All News
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Featured row — 2 large cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((item, i) => (
            <article
              key={i}
              className="card-hover group rounded-2xl bg-white border border-slate-100 overflow-hidden"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-7">
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${
                    categoryColors[item.category] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.category}
                </span>
                <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-lg sm:text-xl mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Smaller news grid — 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, i) => (
            <article
              key={i}
              className="card-hover group rounded-2xl bg-white border border-slate-100 overflow-hidden flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span
                  className={`inline-block w-fit px-3 py-1 text-xs font-bold rounded-full mb-3 ${
                    categoryColors[item.category] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.category}
                </span>
                <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-sm sm:text-base mb-2 leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1 line-clamp-2">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-3 text-saffron font-semibold text-xs hover:text-saffron-dark transition-colors group/link"
                  aria-label={`Read more about ${item.title}`}
                >
                  Read More
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
