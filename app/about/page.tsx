import { Target, Globe, Flag, Trophy, Users, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Learn about the Wheelchair Rugby Federation of India, the history and recognition of wheelchair rugby, the journey in India, and our aim.",
};

export default function AboutPage() {
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
              Who We Are
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              About <span className="gradient-text">WRFI</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
              Championing wheelchair rugby and inclusive sports across India
              since 2009.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* About WRFI Intro */}
        <section className="py-16 sm:py-24 bg-white" id="about-intro">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=800&q=80"
                    alt="WRFI team during a wheelchair rugby match"
                    className="w-full h-[350px] sm:h-[450px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-saffron/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-accent/10 rounded-full -z-10" />
              </div>

              <div className="space-y-6">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
                  Wheelchair Rugby Federation of India
                </h2>
                <div className="section-divider" />
                <p className="text-lg text-slate-600 leading-relaxed">
                  The <strong className="text-navy">Wheelchair Rugby Federation of India (WRFI)</strong> is
                  the official national governing body for wheelchair rugby in India. Affiliated with
                  the <strong className="text-navy">International Wheelchair Rugby Federation (IWRF)</strong>,
                  WRFI is dedicated to developing, promoting, and organizing wheelchair rugby
                  at all levels — from grassroots participation to elite international competition.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We work tirelessly to create opportunities for athletes with physical
                  disabilities, ensuring they have access to world-class coaching, equipment,
                  and competitive platforms to showcase their talent and determination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History and Recognition of Wheelchair Rugby */}
        <section className="py-16 sm:py-24 bg-slate-50" id="history-recognition">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                The Sport
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight">
                History &amp; Recognition of{" "}
                <span className="gradient-text">Wheelchair Rugby</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Wheelchair rugby, originally known as <strong className="text-navy">&ldquo;Murderball&rdquo;</strong>,
                  was invented in <strong className="text-navy">1977 in Winnipeg, Canada</strong> by a
                  group of quadriplegic athletes — Gerry Terwin, Duncan Campbell, Randy Dueck,
                  Paul LeJeune, and Chris Fonseca — who were looking for a sport that would
                  allow players with reduced arm and hand function to compete on an equal basis.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The sport was first demonstrated at the <strong className="text-navy">1996 Atlanta
                  Paralympics</strong> and became a full medal sport at the <strong className="text-navy">2000
                  Sydney Paralympics</strong>. Today, it is one of the most exciting and
                  physically demanding Paralympic sports, played in over 40 countries worldwide.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Wheelchair rugby is governed internationally by the{" "}
                  <strong className="text-navy">International Wheelchair Rugby Federation (IWRF)</strong>,
                  which was established in 1993 and recognized by the International Paralympic
                  Committee (IPC).
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { year: "1977", text: "Invented in Winnipeg, Canada by quadriplegic athletes", icon: Flag },
                  { year: "1993", text: "IWRF established as the international governing body", icon: Globe },
                  { year: "1996", text: "Demonstration sport at the Atlanta Paralympics", icon: Trophy },
                  { year: "2000", text: "Full medal sport at the Sydney Paralympics", icon: Trophy },
                  { year: "40+", text: "Countries actively playing wheelchair rugby today", icon: Users },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="card-hover flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100"
                    >
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

        {/* The Journey in India */}
        <section className="py-16 sm:py-24 bg-white" id="journey-india">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                  India&apos;s Story
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
                  The Journey in <span className="gradient-text">India</span>
                </h2>
                <div className="section-divider" />
                <p className="text-lg text-slate-600 leading-relaxed">
                  Wheelchair rugby was <strong className="text-navy">introduced in India in 2009</strong>,
                  marking the beginning of a new era in Indian para-sports. The sport quickly
                  gained traction among athletes with quadriplegia and other physical
                  disabilities across the country.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  The <strong className="text-navy">Wheelchair Rugby Federation of India (WRFI)</strong> was
                  officially established to provide a structured governing body for the sport.
                  Since its formation, WRFI has organized national championships, grassroots
                  training camps across <strong className="text-navy">15+ states</strong>, and
                  has been instrumental in sending Team India to international competitions.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  From a handful of players in 2009 to a growing community of{" "}
                  <strong className="text-navy">220+ athletes</strong> across the nation, the
                  journey of wheelchair rugby in India is a testament to the resilience and
                  spirit of Indian para-athletes.
                </p>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=800&q=80"
                    alt="Wheelchair rugby players competing in India"
                    className="w-full h-[350px] sm:h-[450px] object-cover"
                  />
                </div>
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-slate-100">
                  <p className="text-navy font-black text-3xl">220+</p>
                  <p className="text-slate-500 text-sm font-medium">Athletes across India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Aim */}
        <section className="py-16 sm:py-24 bg-navy relative overflow-hidden" id="our-aim">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                Our Purpose
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Our <span className="gradient-text">Aim</span>
              </h2>
              <div className="section-divider mx-auto mt-6" />
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                WRFI is driven by a singular vision — to make wheelchair rugby a
                mainstream sport in India and empower every athlete with a disability.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: "Develop the Sport",
                  desc: "Build a robust infrastructure for wheelchair rugby across all states of India, from grassroots to elite level.",
                  color: "from-saffron to-orange-500",
                },
                {
                  icon: Users,
                  title: "Empower Athletes",
                  desc: "Provide world-class coaching, equipment, and financial support to athletes with disabilities nationwide.",
                  color: "from-blue-accent to-blue-600",
                },
                {
                  icon: Globe,
                  title: "International Excellence",
                  desc: "Prepare and send competitive Indian teams to Paralympic Games, World Championships, and continental events.",
                  color: "from-india-green to-emerald-500",
                },
                {
                  icon: Flag,
                  title: "Inclusive Society",
                  desc: "Use sport as a vehicle for social change, breaking barriers and promoting inclusion in every community.",
                  color: "from-gold to-amber-500",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="card-hover group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-center"
                  >
                    <div
                      className={`w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="text-center mt-14">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
              >
                Join the Movement
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
