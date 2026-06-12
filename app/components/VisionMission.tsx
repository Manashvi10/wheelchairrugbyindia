import { Eye, Target, Heart, LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [Eye, Target, Heart];
const STYLES = [
  { gradient: "from-saffron to-orange-500", bg: "bg-gradient-to-br from-saffron/10 to-orange-50", border: "border-saffron/20", iconBg: "bg-saffron" },
  { gradient: "from-blue-accent to-blue-600", bg: "bg-gradient-to-br from-blue-accent/10 to-blue-50", border: "border-blue-accent/20", iconBg: "bg-blue-accent" },
  { gradient: "from-india-green to-emerald-500", bg: "bg-gradient-to-br from-india-green/10 to-emerald-50", border: "border-india-green/20", iconBg: "bg-india-green" },
];

type VMVItem = { title?: string; description?: string };

const DEFAULT_CARDS: VMVItem[] = [
  { title: "Our Vision", description: "To make India a leading force in international wheelchair rugby, ensuring every athlete with a disability has the opportunity to compete, excel, and inspire." },
  { title: "Our Motto", description: "\"Sports With Different Ability\" — We believe that ability is not defined by physicality, but by determination, courage, and the will to push beyond limits." },
  { title: "Our Values", description: "Inclusion, integrity, and excellence. We stand for equal opportunity, fair play, athlete welfare, and the transformative power of sport in building a better society." },
];

export default function VisionMission({ data }: { data?: unknown[] }) {
  const cards: VMVItem[] = (data as VMVItem[] | undefined)?.length ? (data as VMVItem[]) : DEFAULT_CARDS;
  return (
    <section
      id="vision"
      className="py-20 sm:py-28 bg-slate-50"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            What Drives Us
          </span>
          <h2
            id="vision-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            Vision, Motto &amp; <span className="gradient-text">Values</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            const s = STYLES[i % STYLES.length];
            return (
              <article
                key={i}
                className={`card-hover group relative rounded-3xl ${s.bg} border ${s.border} p-8 sm:p-10 text-center overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${s.gradient}`} />
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${s.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
