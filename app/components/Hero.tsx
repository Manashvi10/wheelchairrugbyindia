"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";

const slides = [
  {
    image: "/images/home.jpg",
    alt: "WRFI Team Photo",
  },
  {
    // Agar slider2.png nahi hai to ye temporary image use hogi
    image: "/images/slider2.png",
    fallback: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0ea6?auto=format&fit=crop&w=1920&q=80",
    alt: "Wheelchair rugby players in action",
  },
  {
    // Agar slider3.png nahi hai to ye temporary image use hogi
    image: "/images/slider3.png",
    fallback: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=1920&q=80",
    alt: "Wheelchair rugby match",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
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
                // Agar image load nahi hui to fallback use karo
                if (slide.fallback && e.currentTarget.src !== slide.fallback) {
                  e.currentTarget.src = slide.fallback;
                }
              }}
            />
          </div>
        ))}
        {/* Gradient overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      </div>

      {/* Slider controls */}
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

      {/* Slide indicators */}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-3xl space-y-4 sm:space-y-8 pl-10 sm:pl-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-saffron animate-pulse" />
            <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
              Official Governing Body of Wheelchair Rugby in India
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
            Wheelchair Rugby
            <br />
            <span className="text-saffron">Federation of India</span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-2xl md:text-3xl font-semibold text-white italic">
            &ldquo;Sports With Different Ability&rdquo;
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <a
              href="#events"
              className="pulse-cta inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-base sm:text-lg transition-all hover:shadow-xl hover:shadow-saffron/30"
            >
              Explore Events
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 border-2 border-white/25 text-white font-bold rounded-full text-base sm:text-lg backdrop-blur-sm transition-all"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Join Us
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
    </section>
  );
}
