import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Wheelchair rugby changed my life. WRFI gave me a platform to compete, to dream big, and to prove that disability is not inability.",
    name: "Arjun Mehta",
    role: "National Team Athlete",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Being part of WRFI has been the most rewarding experience. The community, the support, the spirit — it's like a second family.",
    name: "Kavita Joshi",
    role: "Women's Team Captain",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "I started as a volunteer and now I coach 30 athletes. WRFI's mission of inclusion is real — you see it in every training session.",
    name: "Deepak Verma",
    role: "State Coach, Maharashtra",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-gradient-to-b from-navy to-navy-light relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="pattern-overlay absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Voices of <span className="gradient-text">Inspiration</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="card-hover p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 flex flex-col"
            >
              <Quote className="w-8 h-8 text-saffron/60 mb-4 shrink-0" />
              <p className="text-white/80 leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-saffron/30"
                />
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
