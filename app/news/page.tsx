"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Calendar, Loader2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Article = {
  id: number; title: string; excerpt: string; image_url: string;
  category: string; published_date: string; is_featured: number;
  status: string; article_url: string;
};
type HeroData = { badge?: string; title?: string; title_gradient?: string; subtitle?: string };
type NewsletterData = { title?: string; subtitle?: string; btn_text?: string; input_placeholder?: string };
type CategoryItem = { name: string; color: string; isDefault: boolean };

const CAT_COLORS: Record<string, string> = {
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

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hero, setHero] = useState<HeroData>({});
  const [newsletter, setNewsletter] = useState<NewsletterData>({});
  const [dbCategories, setDbCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    Promise.all([
      fetch("/api/news").then(r => r.json()),
      fetch("/api/about-sections/news_hero").then(r => r.json()),
      fetch("/api/about-sections/news_newsletter").then(r => r.json()),
      fetch("/api/about-sections/news_categories").then(r => r.json()),
    ]).then(([newsData, heroData, newsletterData, catsData]) => {
      setArticles((newsData.articles ?? []).filter((a: Article) => a.status === "Published"));
      setHero(heroData.data ?? {});
      setNewsletter(newsletterData.data ?? {});
      if (Array.isArray(catsData.data)) {
        setDbCategories(catsData.data);
        const def = (catsData.data as CategoryItem[]).find(c => c.isDefault);
        if (def) setActiveCategory(def.name);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const published = articles.filter(a => a.status === "Published");
  const featured = published.filter(a => a.is_featured);
  const nonFeatured = published.filter(a => !a.is_featured);
  const categories: string[] = dbCategories.length > 0
    ? dbCategories.map(c => c.name)
    : ["All News", ...Array.from(new Set(published.map(a => a.category)))];

  const defaultCat = dbCategories.find(c => c.isDefault)?.name ?? "All News";
  const filtered = activeCategory === defaultCat || activeCategory === ""
    ? nonFeatured
    : nonFeatured.filter(a => a.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

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
              {hero.badge || "Stay Informed"}
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {hero.title || "Latest"} <span className="gradient-text">{hero.title_gradient || "News"}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
              {hero.subtitle || "Updates, announcements, and inspiring stories from the world of wheelchair rugby in India."}
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* News Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {loading ? (
              <div className="flex items-center justify-center py-32 gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Loading news…</span>
              </div>
            ) : (
              <>
                {/* Category filter */}
                <div className="mb-12 overflow-x-auto pb-2">
                  <div className="flex gap-2 min-w-max">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(9); }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeCategory === cat ? "bg-saffron text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured news */}
                {featured.length > 0 && (activeCategory === defaultCat || activeCategory === "") && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-black text-navy mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-saffron rounded-full" /> Featured Stories
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {featured.map(item => (
                        <article key={item.id} className="card-hover group rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                          <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-200">
                            {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                          </div>
                          <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${CAT_COLORS[item.category] || "bg-slate-100 text-slate-700"}`}>{item.category}</span>
                              {item.published_date && <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Calendar className="w-3.5 h-3.5" />{item.published_date}</span>}
                            </div>
                            <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-xl sm:text-2xl mb-3 leading-tight">{item.title}</h3>
                            {item.excerpt && <p className="text-slate-600 leading-relaxed mb-4">{item.excerpt}</p>}
                            <a href={item.article_url || "#"} className="inline-flex items-center gap-1.5 text-saffron font-semibold text-sm hover:text-saffron-dark transition-colors group/link">
                              Read Full Story <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* All news grid */}
                {visible.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black text-navy mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-blue-accent rounded-full" />
                      {activeCategory === "All News" ? "All News" : activeCategory}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visible.map(item => (
                        <article key={item.id} className="card-hover group rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex flex-col">
                          <div className="relative h-48 overflow-hidden bg-slate-200">
                            {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                          </div>
                          <div className="p-5 sm:p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${CAT_COLORS[item.category] || "bg-slate-100 text-slate-700"}`}>{item.category}</span>
                            </div>
                            <h3 className="font-bold text-navy group-hover:text-saffron transition-colors text-base sm:text-lg mb-2 leading-snug">{item.title}</h3>
                            {item.excerpt && <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">{item.excerpt}</p>}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              {item.published_date && <span className="flex items-center gap-1.5 text-slate-400 text-xs"><Calendar className="w-3.5 h-3.5" />{item.published_date}</span>}
                              <a href={item.article_url || "#"} className="inline-flex items-center gap-1 text-saffron font-semibold text-xs hover:text-saffron-dark transition-colors group/link ml-auto">
                                Read <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {visible.length === 0 && !loading && (
                  <p className="text-center text-slate-400 text-lg py-20">No articles in this category.</p>
                )}

                {/* Load more */}
                {filtered.length > visibleCount && (
                  <div className="text-center mt-12">
                    <button onClick={() => setVisibleCount(v => v + 9)} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-navy font-bold rounded-full transition-colors">
                      Load More News
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {newsletter.title || "Never Miss an Update"}
            </h2>
            <p className="text-white text-lg mb-8">
              {newsletter.subtitle || "Subscribe to our newsletter for the latest news, events, and stories delivered to your inbox."}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder={newsletter.input_placeholder || "Your email address"} required
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-saffron focus:ring-2 focus:ring-saffron/30 outline-none transition-all" />
              <button type="submit" className="px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full transition-all hover:shadow-xl hover:shadow-saffron/30">
                {newsletter.btn_text || "Subscribe"}
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
