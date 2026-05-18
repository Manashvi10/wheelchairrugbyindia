import Header from "../components/Header";
import Footer from "../components/Footer";
import { Handshake, Star, Globe, Award } from "lucide-react";
import { partnerLogos } from "../components/PartnerLogos";

export const metadata = {
  title: "Our Partners - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Meet the official partners and sponsors supporting the Wheelchair Rugby Federation of India in our mission to promote inclusive sports.",
};

const partnerTiers = [
  {
    tier: "Title Sponsors",
    icon: <Award className="w-6 h-6" />,
    color: "from-yellow-400 to-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    partners: [partnerLogos[1], partnerLogos[0]].map((p) => ({
      ...p,
      desc: "Official Title Sponsor",
    })),
  },
  {
    tier: "Official Partners",
    icon: <Star className="w-6 h-6" />,
    color: "from-blue-500 to-navy",
    bg: "bg-blue-50",
    border: "border-blue-200",
    partners: [partnerLogos[2], partnerLogos[3], partnerLogos[6], partnerLogos[4]].map((p) => ({
      ...p,
      desc: "Official Partner",
    })),
  },
  {
    tier: "Supporting Partners",
    icon: <Handshake className="w-6 h-6" />,
    color: "from-green-500 to-india-green",
    bg: "bg-green-50",
    border: "border-green-200",
    partners: [
      partnerLogos[5],
      partnerLogos[7],
      partnerLogos[0],
      partnerLogos[4],
      partnerLogos[3],
      partnerLogos[6],
    ].map((p) => ({ ...p, desc: "Supporting Partner" })),
  },
  {
    tier: "Media Partners",
    icon: <Globe className="w-6 h-6" />,
    color: "from-saffron to-saffron-dark",
    bg: "bg-orange-50",
    border: "border-orange-200",
    partners: [partnerLogos[2], partnerLogos[5], partnerLogos[7]].map((p) => ({
      ...p,
      desc: "Media Partner",
    })),
  },
];

export default function PartnersPage() {
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
              Our Supporters
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Partners &amp; <span className="gradient-text">Sponsors</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Together with our valued partners, we champion wheelchair rugby and inclusive sports across India.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Watermark Intro Section */}
        <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
          {/* Watermark — clamped so it never overflows */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-black uppercase leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(3.5rem, 14vw, 10rem)",
                color: "rgba(0,0,0,0.04)",
                letterSpacing: "0.12em",
              }}
            >
              SPONSORS
            </span>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-saffron font-semibold text-xs sm:text-sm tracking-widest uppercase">
              Proudly Supported By
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-700 tracking-tight">
              THE OFFICIAL PARTNERS
            </h2>
            <div className="section-divider mt-4 mx-auto" />
            <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              We are grateful to our sponsors and partners whose generous support helps us grow
              wheelchair rugby across the nation and empower athletes with disabilities.
            </p>
          </div>
        </section>

        {/* Partner Tiers */}
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {partnerTiers.map((tier) => (
              <div key={tier.tier}>
                {/* Tier heading */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white shadow-md`}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-black text-navy">{tier.tier}</h3>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Partner cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {tier.partners.map((partner, idx) => (
                    <div
                      key={`${tier.tier}-${idx}`}
                      className={`group relative ${tier.bg} border ${tier.border} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 min-h-[160px] card-hover cursor-pointer`}
                    >
                      {/* Logo */}
                      <div className="w-full max-w-[160px] h-14 bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 px-3">
                        {partner.svg}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-navy">{partner.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{partner.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span className="text-[8rem] sm:text-[12rem] font-black text-white/5 uppercase tracking-widest">
              JOIN US
            </span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              Partner With Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight">
              Become an Official Partner
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Join our growing family of partners and help us build a more inclusive sporting
              culture in India. Your support directly impacts the lives of wheelchair rugby
              athletes nationwide.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full transition-all hover:shadow-lg hover:shadow-saffron/30 pulse-cta"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-bold rounded-full transition-all hover:bg-white/10"
              >
                Learn About WRFI
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
