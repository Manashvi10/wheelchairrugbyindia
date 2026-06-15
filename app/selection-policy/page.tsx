import Header from "../components/Header";
import Footer from "../components/Footer";
import { CheckCircle, Users, Trophy, FileText, Target, Award, type LucideIcon } from "lucide-react";
import { getAboutSection } from "../lib/cms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Selection Policy - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Official selection policy and criteria for Indian wheelchair rugby national teams. Transparent, merit-based athlete selection process.",
};

const ICON_MAP: Record<string, LucideIcon> = { Trophy, Users, Target, Award, FileText, CheckCircle };

type HeroData = { badge?: string; title?: string; title_gradient?: string; subtitle?: string };
type CriteriaData = { badge?: string; title?: string; title_gradient?: string; items?: { icon: string; title: string; description: string }[] };
type ProcessData = { badge?: string; title?: string; title_gradient?: string; steps?: { step: string; title: string; description: string }[] };
type EligibilityData = { badge?: string; title?: string; title_gradient?: string; requirements?: string[]; important_note?: string };
type CTAData = { title?: string; subtitle?: string; btn1_text?: string; btn1_url?: string; btn2_text?: string; btn2_url?: string };

const DEFAULT_CRITERIA = [
  { icon: "Trophy", title: "Performance Excellence", description: "Athletes are evaluated based on competitive performance, skill proficiency, and consistency in national and international tournaments." },
  { icon: "Users", title: "Team Compatibility", description: "Ability to work cohesively within team dynamics, demonstrate sportsmanship, and contribute to collective team success." },
  { icon: "Target", title: "Classification Standards", description: "Compliance with IWRF classification system and eligibility criteria for wheelchair rugby competition." },
  { icon: "Award", title: "Training Commitment", description: "Regular participation in national training camps, adherence to fitness standards, and dedication to continuous improvement." },
];

const DEFAULT_STEPS = [
  { step: "1", title: "Athlete Registration", description: "Athletes register through official WRFI channels and submit required documentation including medical clearance and classification certificates." },
  { step: "2", title: "Performance Assessment", description: "Evaluation during national championships, training camps, and selection trials by certified coaches and technical committee." },
  { step: "3", title: "Technical Review", description: "Selection committee reviews performance data, coach recommendations, and athlete profiles against established criteria." },
  { step: "4", title: "Final Selection", description: "Transparent announcement of selected athletes with feedback provided to all participants for continuous development." },
];

const DEFAULT_REQUIREMENTS = [
  "Indian citizenship with valid proof of identity",
  "Valid IWRF classification certificate",
  "Medical fitness clearance from authorized physician",
  "Minimum age requirement: 16 years for junior teams, 18 years for senior teams",
  "Active membership with WRFI-affiliated state association",
  "Adherence to WADA anti-doping regulations",
  "Participation in mandatory national training camps",
  "Clean disciplinary record with no pending sanctions",
];

export default async function SelectionPolicyPage() {
  const [heroR, criteriaR, processR, eligibilityR, ctaR] = await Promise.all([
    getAboutSection<HeroData>("selection_hero"),
    getAboutSection<CriteriaData>("selection_criteria"),
    getAboutSection<ProcessData>("selection_process"),
    getAboutSection<EligibilityData>("eligibility"),
    getAboutSection<CTAData>("selection_cta"),
  ]);

  const hero = heroR.data ?? {};
  const criteria = criteriaR.data ?? {};
  const process = processR.data ?? {};
  const eligibility = eligibilityR.data ?? {};
  const cta = ctaR.data ?? {};

  const criteriaItems = criteria.items ?? DEFAULT_CRITERIA;
  const processSteps = process.steps ?? DEFAULT_STEPS;
  const requirements = eligibility.requirements ?? DEFAULT_REQUIREMENTS;

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Hero Section */}
        {heroR.is_enabled && (
          <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
            <div className="pattern-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                {hero.badge || "Transparent & Merit-Based"}
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {hero.title || "Selection"} <span className="gradient-text">{hero.title_gradient || "Policy"}</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                {hero.subtitle || "Our commitment to excellence through fair, transparent, and merit-based athlete selection for Indian wheelchair rugby teams."}
              </p>
              <div className="section-divider mt-6" />
            </div>
          </section>
        )}

        {/* Selection Criteria */}
        {criteriaR.is_enabled && (
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {criteria.badge || "Core Principles"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  {criteria.title || "Selection"} <span className="gradient-text">{criteria.title_gradient || "Criteria"}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {criteriaItems.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] ?? Trophy;
                  return (
                    <article key={i} className="card-hover bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-navy mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Selection Process */}
        {processR.is_enabled && (
          <section className="py-16 sm:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {process.badge || "Step by Step"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  {process.title || "Selection"} <span className="gradient-text">{process.title_gradient || "Process"}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {processSteps.map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron/5 to-transparent rounded-bl-full" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center mb-4">
                        <span className="text-white font-black text-xl">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-black text-navy mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Eligibility Requirements */}
        {eligibilityR.is_enabled && (
          <section className="py-16 sm:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  {eligibility.badge || "Essential Requirements"}
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                  {eligibility.title || "Eligibility"} <span className="gradient-text">{eligibility.title_gradient || "Criteria"}</span>
                </h2>
                <div className="section-divider mx-auto mt-6" />
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-100">
                <div className="space-y-4">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-saffron shrink-0 mt-0.5" />
                      <p className="text-slate-700 leading-relaxed">{req}</p>
                    </div>
                  ))}
                </div>
              </div>
              {(eligibility.important_note || true) && (
                <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="flex gap-3">
                    <FileText className="w-6 h-6 text-blue-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-navy mb-2">Important Note</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {eligibility.important_note || "Selection decisions are final and made in the best interest of team performance and athlete development. All athletes receive constructive feedback to support their continuous growth in the sport."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA Section */}
        {ctaR.is_enabled && (
          <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
            <div className="pattern-overlay absolute inset-0" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                {cta.title || "Ready to Represent India?"}
              </h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                {cta.subtitle || "Join our national training programs and work towards selection for Team India in wheelchair rugby."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={cta.btn1_url || "/contact"} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta">
                  {cta.btn1_text || "Contact Us"}
                </a>
                <a href={cta.btn2_url || "/events"} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/25 text-white font-bold rounded-full text-lg backdrop-blur-sm transition-all">
                  {cta.btn2_text || "View Events"}
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
