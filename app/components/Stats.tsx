"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Calendar, MapPin, UserCheck } from "lucide-react";

const stats = [
  { icon: Users, value: 220, suffix: "+", label: "Players", color: "text-saffron" },
  { icon: Calendar, value: 15, suffix: "+", label: "Events", color: "text-blue-accent" },
  { icon: MapPin, value: 10, suffix: "+", label: "States", color: "text-india-green" },
  { icon: UserCheck, value: 40, suffix: "+", label: "Women Athletes", color: "text-gold" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      className="py-16 sm:py-20 bg-navy relative overflow-hidden"
      aria-label="Impact statistics"
    >
      <div className="pattern-overlay absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Our Impact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white tracking-tight">
            Numbers That <span className="gradient-text">Inspire</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/60 text-sm font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
