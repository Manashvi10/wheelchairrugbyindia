import { Target, Globe, Flag, Trophy, Users, ArrowRight, type LucideIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAboutSection } from "../lib/cms";

export const metadata = {
  title: "About Us - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Learn about the Wheelchair Rugby Federation of India, the history and recognition of wheelchair rugby, the journey in India, and our aim.",
};

const ICON_MAP: Record<string, LucideIcon> = { Target, Globe, Flag, Trophy, Users };
const TIMELINE_ICONS: LucideIcon[] = [Flag, Globe, Trophy, Trophy, Users];

type HeroData = { badge?: string; title?: string; title_gradient?: string; subtitle?: string };
type IntroData = { badge?: string; title?: string; image_url?: string; image_alt?: string; body1?: string; body2?: string };
type HistoryData = { badge?: string; title?: string; title_gradient?: string; body1?: string; body2?: string; body3?: string; timeline?: { year: string; text: string }[] };
type JourneyData = { badge?: string; title?: string; title_gradient?: string; body1?: string; body2?: string; body3?: string; image_url?: string; image_alt?: string; stat_number?: string; stat_label?: string };
type AimData = { badge?: string; title?: string; title_gradient?: string; subtitle?: string; cta_text?: string; cta_url?: string; cards?: { icon: string; title: string; description: string; color: string }[] };

export default async function AboutPage() {
  const [heroR, introR, histR, journeyR, aimR] = await Promise.all([
    getAboutSection<HeroData>("about_hero"),
    getAboutSection<IntroData>("about_intro"),
    getAboutSection<HistoryData>("history_recognition"),
    getAboutSection<JourneyData>("journey_india"),
    getAboutSection<AimData>("our_aim"),
  ]);

  const hero = heroR.data ?? {};
  const intro = introR.data ?? {};
  const hist = histR.data ?? {};
  const journey = journeyR.data ?? {};
  const aim = aimR.data ?? {};

  const timeline = hist.timeline ?? [
    { year: "1977", text: "Invented in Winnipeg, Canada by quadriplegic athletes" },
    { year: "1993", text: "IWRF established as the international governing body" },
    { year: "1996", text: "Demonstration sport at the Atlanta Paralympics" },
    { year: "2000", text: "Full medal sport at the Sydney Paralympics" },
    { year: "40+", text: "Countries actively playing wheelchair rugby today" },
  ];

  const aimCards = aim.cards ?? [
    { icon: "Target", title: "Develop the Sport", description: "Build a robust infrastructure for wheelchair rugby across all states of India, from grassroots to elite level.", color: "from-saffron to-orange-500" },
    { icon: "Users", title: "Empower Athletes", description: "Provide world-class coaching, equipment, and financial support to athletes with disabilities nationwide.", color: "from-blue-accent to-blue-600" },
    { icon: "Globe", title: "International Excellence", description: "Prepare and send competitive Indian teams to Paralympic Games, World Championships, and continental events.", color: "from-india-green to-emerald-500" },
    { icon: "Flag", title: "Inclusive Society", description: "Use sport as a vehicle for social change, breaking barriers and promoting inclusion in every community.", color: "from-gold to-amber-500" },
  ];

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Page Hero Banner */}
        {heroR.is_enabled && (
          <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
            <div className="pattern-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                {hero.badge || "Who We Are"}
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {hero.title || "About"} <span className="gradient-text">{hero.title_gradient || "WRFI"}</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                {hero.subtitle || "Championing wheelchair rugby and inclusive sports across India since 2009."}
              </p>
              <div className="section-divider mt-6" />
            </div>
          </section>
        )}

        {/* About WRFI Intro */}
        {introR.is_enabled && (
          <section className="py-16 sm:py-24 bg-white" id="about-intro">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={intro.image_url || "/images/abou.png"}
                      alt={intro.image_alt || "WRFI team during a wheelchair rugby match"}
                      className="w-full h-[350px] sm:h-[450px] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-saffron/10 rounded-2xl -z-10" />
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-accent/10 rounded-full -z-10" />
                </div>
                <div className="space-y-6">
                  <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                    {intro.badge || "About Us"}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
                    {intro.title || "Wheelchair Rugby Federation of India"}
                  </h2>
                  <div className="section-divider" />
                  {(intro.body1 || intro.body2) ? (
                    <>
                      {intro.body1 && <p className="text-lg text-slate-600 leading-relaxed">{intro.body1}</p>}
                      {intro.body2 && <p className="text-lg text-slate-600 leading-relaxed">{intro.body2}</p>}
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        The <strong className="text-navy">Wheelchair Rugby Federation of India (WRFI)</strong> is the official national governing body for wheelchair rugby in India. Affiliated with the <strong className="text-navy">International Wheelchair Rugby Federation (IWRF)</strong>, WRFI is dedicated to developing, promoting, and organizing wheelchair rugby at all levels.
                      </p>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        We work tirelessly to create opportunities for athletes with physical disabilities, ensuring they have access to world-class coaching, equipment, and competitive platforms to showcase their talent and determination.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* History and Recognition */}
        {histR.is_enabled && (
          <section className="py-16 sm:py-24 bg-slate-50" id="history-recognition">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {hist.badge || "The Sport"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  {hist.title || "History & Recognition of"}{" "}
                  <span className="gradient-text">{hist.title_gradient || "Wheelchair Rugby"}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  {(hist.body1 || hist.body2 || hist.body3) ? (
                    <>
                      {hist.body1 && <p className="text-lg text-slate-600 leading-relaxed">{hist.body1}</p>}
                      {hist.body2 && <p className="text-lg text-slate-600 leading-relaxed">{hist.body2}</p>}
                      {hist.body3 && <p className="text-lg text-slate-600 leading-relaxed">{hist.body3}</p>}
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-slate-600 leading-relaxed">Wheelchair rugby, originally known as <strong className="text-navy">&ldquo;Murderball&rdquo;</strong>, was invented in <strong className="text-navy">1977 in Winnipeg, Canada</strong> by a group of quadriplegic athletes who were looking for a sport that would allow players with reduced arm and hand function to compete on an equal basis.</p>
                      <p className="text-lg text-slate-600 leading-relaxed">The sport was first demonstrated at the <strong className="text-navy">1996 Atlanta Paralympics</strong> and became a full medal sport at the <strong className="text-navy">2000 Sydney Paralympics</strong>. Today, it is played in over 40 countries worldwide.</p>
                      <p className="text-lg text-slate-600 leading-relaxed">Wheelchair rugby is governed internationally by the <strong className="text-navy">International Wheelchair Rugby Federation (IWRF)</strong>, established in 1993 and recognized by the IPC.</p>
                    </>
                  )}
                </div>
                <div className="space-y-4">
                  {timeline.map((item, i) => {
                    const Icon = TIMELINE_ICONS[i % TIMELINE_ICONS.length];
                    return (
                      <div key={i} className="card-hover flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-saffron" />
                        </div>
                        <div>
                          <span className="text-saffron font-black text-sm">{item.year}</span>
                          <p className="text-slate-600 text-sm mt-0.5">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The Journey in India */}
        {journeyR.is_enabled && (
          <section className="py-16 sm:py-24 bg-white" id="journey-india">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1 space-y-6">
                  <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                    {journey.badge || "India's Story"}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
                    {journey.title || "The Journey in"} <span className="gradient-text">{journey.title_gradient || "India"}</span>
                  </h2>
                  <div className="section-divider" />
                  {(journey.body1 || journey.body2 || journey.body3) ? (
                    <>
                      {journey.body1 && <p className="text-lg text-slate-600 leading-relaxed">{journey.body1}</p>}
                      {journey.body2 && <p className="text-lg text-slate-600 leading-relaxed">{journey.body2}</p>}
                      {journey.body3 && <p className="text-lg text-slate-600 leading-relaxed">{journey.body3}</p>}
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-slate-600 leading-relaxed">Wheelchair rugby was <strong className="text-navy">introduced in India in 2009</strong>, marking the beginning of a new era in Indian para-sports.</p>
                      <p className="text-lg text-slate-600 leading-relaxed">The <strong className="text-navy">WRFI</strong> was officially established to provide a structured governing body for the sport, organizing national championships and grassroots training camps across <strong className="text-navy">15+ states</strong>.</p>
                      <p className="text-lg text-slate-600 leading-relaxed">From a handful of players in 2009 to a growing community of <strong className="text-navy">220+ athletes</strong> across the nation.</p>
                    </>
                  )}
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={journey.image_url || "/images/abb.jpg"}
                      alt={journey.image_alt || "Wheelchair rugby players competing in India"}
                      className="w-full h-[350px] sm:h-[450px] object-cover"
                    />
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-slate-100">
                    <p className="text-navy font-black text-3xl">{journey.stat_number || "220+"}</p>
                    <p className="text-slate-500 text-sm font-medium">{journey.stat_label || "Athletes across India"}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our Aim */}
        {aimR.is_enabled && (
          <section className="py-16 sm:py-24 bg-navy relative overflow-hidden" id="our-aim">
            <div className="pattern-overlay absolute inset-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {aim.badge || "Our Purpose"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {aim.title || "Our"} <span className="gradient-text">{aim.title_gradient || "Aim"}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
                {(aim.subtitle) && (
                  <p className="mt-6 text-lg text-white leading-relaxed">{aim.subtitle}</p>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aimCards.map((card, i) => {
                  const Icon = ICON_MAP[card.icon] ?? Target;
                  return (
                    <div key={i} className="card-hover group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-center">
                      <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-white text-sm leading-relaxed">{card.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-14">
                <a href={aim.cta_url || "/contact"} className="inline-flex items-center gap-2.5 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta">
                  {aim.cta_text || "Join the Movement"}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
