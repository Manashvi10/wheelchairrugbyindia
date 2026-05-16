const milestones = [
  {
    year: "1977",
    title: "Sport Invented",
    description:
      "Wheelchair rugby was invented in Winnipeg, Canada by athletes looking for an alternative to wheelchair basketball that would allow quadriplegics to compete equally.",
    color: "bg-saffron",
  },
  {
    year: "1994",
    title: "Recognized as Paralympic Sport",
    description:
      "Wheelchair rugby was officially recognized as a Paralympic sport and featured as a demonstration event at the 1996 Atlanta Paralympics.",
    color: "bg-blue-accent",
  },
  {
    year: "2009",
    title: "Introduced in India",
    description:
      "Wheelchair rugby was introduced in India, marking the beginning of a new chapter in Indian para-sports. The first demonstrations and training sessions began.",
    color: "bg-india-green",
  },
  {
    year: "2019",
    title: "WRFI Established",
    description:
      "The Wheelchair Rugby Federation of India was officially formed, uniting athletes, coaches, and supporters under a single governing body.",
    color: "bg-saffron",
  },
  {
    year: "2024",
    title: "International Debut",
    description:
      "Team India competed in its first international wheelchair rugby tournament, putting the country on the global wheelchair rugby map.",
    color: "bg-gold",
  },
];

export default function History() {
  return (
    <section
      id="history"
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="history-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Our History
          </span>
          <h2
            id="history-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            The Journey of{" "}
            <span className="gradient-text">Wheelchair Rugby</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex gap-6 sm:gap-8 items-start">
                {/* Dot */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${m.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-black text-xs sm:text-sm">
                      {m.year}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="card-hover flex-1 p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white">
                  <h3 className="text-lg sm:text-xl font-bold text-navy mb-2">
                    {m.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
