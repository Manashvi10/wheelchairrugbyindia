import Header from "../components/Header";
import Footer from "../components/Footer";
import { Handshake, Star, Globe, Award, Building2 } from "lucide-react";
import { getAboutSection, getPartners } from "../lib/cms";

export const metadata = {
  title: "Our Partners - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Meet the official partners and sponsors supporting the Wheelchair Rugby Federation of India in our mission to promote inclusive sports.",
};

type PageData = {
  badge?: string; title?: string; title_gradient?: string; subtitle?: string;
  intro_badge?: string; intro_title?: string; intro_description?: string;
  cta_badge?: string; cta_title?: string; cta_description?: string;
  cta_btn1_text?: string; cta_btn1_url?: string; cta_btn2_text?: string; cta_btn2_url?: string;
  hidden_categories?: string[];
};

const TIER_META: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  "Title Sponsor":    { color: "from-yellow-400 to-amber-500", bg: "bg-amber-50",  border: "border-amber-200",  icon: <Award className="w-6 h-6" /> },
  "Official Partner": { color: "from-blue-500 to-navy",        bg: "bg-blue-50",   border: "border-blue-200",   icon: <Star className="w-6 h-6" /> },
  "Supporting Partner":{ color: "from-green-500 to-emerald-600",bg: "bg-green-50", border: "border-green-200",  icon: <Handshake className="w-6 h-6" /> },
  "Media Partner":    { color: "from-saffron to-saffron-dark",  bg: "bg-orange-50", border: "border-orange-200", icon: <Globe className="w-6 h-6" /> },
};
const TIER_ORDER = ["Title Sponsor", "Official Partner", "Supporting Partner", "Media Partner"];

export default async function PartnersPage() {
  const [pageR, partners] = await Promise.all([
    getAboutSection<PageData>("partners_page"),
    getPartners(),
  ]);

  const page = pageR.data ?? {};
  const hiddenCategories: string[] = page.hidden_categories ?? [];

  const grouped: Record<string, typeof partners> = {};
  for (const p of partners) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  const visibleTiers = TIER_ORDER.filter(
    (tier) => !hiddenCategories.includes(tier) && (grouped[tier]?.length ?? 0) > 0
  );

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Page Hero Banner */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              {page.badge || "Our Supporters"}
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {page.title || "Partners"} <span className="gradient-text">{page.title_gradient || "Sponsors"}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              {page.subtitle || "Together with our valued partners, we champion wheelchair rugby and inclusive sports across India."}
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Watermark Intro Section */}
        <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span className="font-black uppercase leading-none whitespace-nowrap" style={{ fontSize: "clamp(3.5rem, 14vw, 10rem)", color: "rgba(0,0,0,0.04)", letterSpacing: "0.12em" }}>
              SPONSORS
            </span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-saffron font-semibold text-xs sm:text-sm tracking-widest uppercase">
              {page.intro_badge || "Proudly Supported By"}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-700 tracking-tight">
              {page.intro_title || "THE OFFICIAL PARTNERS"}
            </h2>
            <div className="section-divider mt-4 mx-auto" />
            <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              {page.intro_description || "We are grateful to our sponsors and partners whose generous support helps us grow wheelchair rugby across the nation and empower athletes with disabilities."}
            </p>
          </div>
        </section>

        {/* Partner Tiers */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {visibleTiers.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Building2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">No partners to display</p>
              </div>
            ) : (
              visibleTiers.map((tier) => {
                const meta = TIER_META[tier] ?? { color: "from-slate-400 to-slate-600", bg: "bg-slate-50", border: "border-slate-200", icon: <Building2 className="w-6 h-6" /> };
                const tierPartners = grouped[tier] ?? [];
                return (
                  <div key={tier}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-md`}>
                        {meta.icon}
                      </div>
                      <h3 className="text-2xl font-black text-navy">{tier}s</h3>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                      {tierPartners.map((partner) => (
                        <a
                          key={partner.id}
                          href={partner.website || "#"}
                          target={partner.website ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={`group relative ${meta.bg} border ${meta.border} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[160px] card-hover cursor-pointer`}
                        >
                          <div className="w-full max-w-[160px] h-14 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 px-3 overflow-hidden">
                            {partner.logo_url ? (
                              <img src={partner.logo_url} alt={partner.name} className="max-h-10 max-w-full object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-navy truncate px-1">{partner.name}</span>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-navy">{partner.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{tier}</p>
                          </div>
                          {partner.featured === 1 && (
                            <span className="absolute top-2 right-2 bg-saffron text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">Featured</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <span className="text-[8rem] sm:text-[12rem] font-black text-white/5 uppercase tracking-widest">JOIN US</span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              {page.cta_badge || "Partner With Us"}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight">
              {page.cta_title || "Become an Official Partner"}
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              {page.cta_description || "Join our growing family of partners and help us build a more inclusive sporting culture in India."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={page.cta_btn1_url || "/contact"} className="px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full transition-all hover:shadow-lg hover:shadow-saffron/30 pulse-cta">
                {page.cta_btn1_text || "Get in Touch"}
              </a>
              <a href={page.cta_btn2_url || "/about"} className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-bold rounded-full transition-all hover:bg-white/10">
                {page.cta_btn2_text || "Learn About WRFI"}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
