"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

type Slide = { image: string; alt?: string; fallback?: string };
type Medal = { color: string; label: string };
type AthleteCard = { name: string; image: string; medals?: Medal[] };
type HeroData = {
  slides?: Slide[]; athletes?: AthleteCard[];
  title?: string; tagline?: string;
  btn_primary_text?: string; btn_primary_url?: string;
  btn_secondary_text?: string; btn_secondary_url?: string;
};

const DEFAULT_SLIDES: Slide[] = [
  { image: "/images/home.jpg", alt: "WRFI Team Photo" },
  { image: "/images/slider2.png", fallback: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=1920&q=80", alt: "Wheelchair rugby players in action" },
  { image: "/images/slider3.png", fallback: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1920&q=80", alt: "Wheelchair rugby match" },
];
const DEFAULT_ATHLETES: AthleteCard[] = [
  { name: "Abhinav Bindra", image: "/images/s1.png", medals: [{ color: "bg-yellow-400", label: "G" }] },
  { name: "Yogeshwar Dutt", image: "/images/s2.png", medals: [{ color: "bg-orange-500", label: "B" }] },
  { name: "Manu Bhaker", image: "/images/s3.png", medals: [{ color: "bg-orange-500", label: "B" }, { color: "bg-orange-500", label: "B" }] },
];

export default function Hero({ data }: { data?: unknown }) {
  const d = (data as HeroData) ?? {};
  const slides = d.slides?.length ? d.slides : DEFAULT_SLIDES;
  const athletes = d.athletes?.length ? d.athletes : DEFAULT_ATHLETES;
  const heroTitle = d.title ?? "Wheelchair Rugby Federation of India";
  const heroTagline = d.tagline ?? '"Sports With Different Ability"';
  const btnPrimaryText = d.btn_primary_text ?? "Explore Events";
  const btnPrimaryUrl = d.btn_primary_url ?? "#events";
  const btnSecondaryText = d.btn_secondary_text ?? "Join Us";
  const btnSecondaryUrl = d.btn_secondary_url ?? "#contact";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Hide slider controls once user has scrolled past the hero viewport
  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.65);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="home"
      className="relative bg-navy"
      aria-labelledby="hero-heading"
    >
      {/* ─────────────────────────────────────────────
          STICKY SLIDER BACKGROUND
          Stays pinned to viewport for entire section,
          so all content (hero text + athletes) scrolls
          over the same slider.
         ───────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (slide.fallback && e.currentTarget.src !== slide.fallback) {
                  e.currentTarget.src = slide.fallback;
                }
              }}
            />
          </div>
        ))}
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

        {/* Slider controls — fade out once user is past hero */}
        <div
          className="transition-opacity duration-300"
          style={{
            opacity: pastHero ? 0 : 1,
            pointerEvents: pastHero ? "none" : "auto",
          }}
        >
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-saffron w-6 sm:w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          SCROLLING CONTENT LAYER
          Negative margin pulls it up over the sticky
          background so everything scrolls together.
         ───────────────────────────────────────────── */}
      <div className="relative -mt-[100vh] z-10">
        {/* ===== HERO HEADING / CTA ===== */}
        <div className="min-h-screen flex items-center">
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
            <div className="max-w-3xl space-y-4 sm:space-y-8 pl-10 sm:pl-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-saffron animate-pulse" />
                <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                  Official Governing Body of Wheelchair Rugby in India
                </span>
              </div>

              {/* Heading */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight"
              >
                <span className="text-saffron">{heroTitle}</span>
              </h1>

              {/* Tagline */}
              <p className="text-base sm:text-2xl md:text-3xl font-semibold text-white italic">
                {heroTagline}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <a
                  href={btnPrimaryUrl}
                  className="pulse-cta inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-saffron/30"
                >
                  {btnPrimaryText}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={btnSecondaryUrl}
                  className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 border-2 border-white/25 text-white font-bold rounded-full text-base sm:text-lg backdrop-blur-sm transition-all"
                >
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  {btnSecondaryText}
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
              <span className="text-white text-xs font-medium tracking-widest uppercase">
                Scroll
              </span>
              <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== OUR ATHLETES SECTION (over slider) ===== */}
        <div className="relative pb-16 sm:pb-24">
          {/* Soft dim wash so heading + cards pop over the slider */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/70 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-16">
            {/* Heading row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-end mb-8 sm:mb-12">
              <div className="sm:col-span-5">
                <span className="block text-saffron text-[11px] sm:text-xs font-bold tracking-[0.35em] uppercase mb-2 drop-shadow-lg">
                  Our Pride
                </span>
                <h2
                  id="our-athletes-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1] drop-shadow-2xl"
                >
                  Our Athletes
                </h2>
              </div>
              <div className="sm:col-span-5">
                <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md drop-shadow-lg">
                  Celebrating the Spirit of Excellence in Sporting Achievements,
                  where dedication, passion, and perseverance unite to inspire
                  victories and create lasting legacies in the world of sports.
                </p>
              </div>
              <div className="sm:col-span-2 sm:text-right">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white border-b border-white/70 pb-1 hover:text-saffron hover:border-saffron transition-colors text-xs sm:text-sm font-semibold"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Athlete cards
                Mobile  → 1 column, large portrait cards stacked
                Desktop → 3 columns, smaller portrait cards (heading stays visible)
            */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 lg:gap-6">
              {athletes.map((a, i) => (
                <div
                  key={a.name}
                  className="group relative rounded-2xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 aspect-[3/4] sm:max-h-[55vh] sm:aspect-[3/4]"
                >
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* Saffron number badge */}
                  <div className="absolute top-3 right-3 sm:top-3 sm:right-3 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-saffron/95 backdrop-blur-sm flex items-center justify-center text-white text-xs sm:text-[11px] font-black shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Name plate */}
                  <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-r from-navy via-navy to-navy-light text-white px-4 sm:px-3 py-3 sm:py-2.5">
                    <p className="text-lg sm:text-sm lg:text-base font-bold leading-tight truncate">
                      {a.name}
                    </p>
                    <div className="w-14 sm:w-10 lg:w-12 h-0.5 bg-saffron mt-2 sm:mt-1.5 mb-2 sm:mb-1.5" />
                    <div className="flex justify-end gap-1">
                      {(a.medals ?? []).map((m, mi) => (
                        <span
                          key={mi}
                          className={`w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full ${m.color} flex items-center justify-center text-[10px] sm:text-[9px] font-black text-white shadow-md`}
                        >
                          {m.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
