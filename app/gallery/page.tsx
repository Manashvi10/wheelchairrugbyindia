"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const categories = [
  "All",
  "Tournaments",
  "Training",
  "Award Ceremonies",
  "Behind the Scenes",
] as const;

type Category = (typeof categories)[number];

const gallery: { src: string; alt: string; cat: Exclude<Category, "All">; span?: string }[] = [
  { src: "/images/g1.jpg", alt: "National Championship final match", cat: "Tournaments", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/g2.jpg", alt: "Athletes training on court", cat: "Training" },
  { src: "/images/g3.jpg", alt: "Team huddle before match", cat: "Behind the Scenes" },
  { src: "/images/g4.jpg", alt: "Championship celebration", cat: "Award Ceremonies" },
  { src: "/images/g5.jpg", alt: "Coaching session", cat: "Training" },
  { src: "/images/g6.jpg", alt: "Opening ceremony", cat: "Tournaments", span: "md:col-span-2" },
  { src: "/images/home.jpg", alt: "WRFI team photo", cat: "Behind the Scenes" },
  { src: "/images/slider2.png", alt: "Match action shot", cat: "Tournaments" },
  { src: "/images/slider3.png", alt: "Wheelchair rugby moments", cat: "Tournaments" },
  { src: "/images/abou.png", alt: "Federation event coverage", cat: "Award Ceremonies", span: "md:col-span-2" },
  { src: "/images/up.png", alt: "Upcoming tournament promo", cat: "Tournaments" },
  { src: "/images/abb.jpg", alt: "Press conference moment", cat: "Behind the Scenes" },
];

export default function GalleryPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? gallery : gallery.filter((g) => g.cat === active);

  const showPrev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };
  const showNext = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero banner */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase inline-flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Moments Captured
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Photo <span className="gradient-text">Gallery</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              A visual journey through tournaments, training sessions, award ceremonies and
              behind-the-scenes moments of Wheelchair Rugby India.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Filter tabs */}
        <section className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    active === c
                      ? "bg-saffron text-white shadow-md shadow-saffron/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[220px]">
              {filtered.map((img, i) => (
                <button
                  key={`${img.src}-${i}`}
                  onClick={() => setLightbox(i)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span ?? ""}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs text-saffron font-bold uppercase tracking-wider">
                      {img.cat}
                    </span>
                    <p className="text-white text-sm font-semibold leading-tight mt-1">
                      {img.alt}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-slate-500 py-20">No photos in this category yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="w-full h-full object-contain max-h-[85vh] rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="text-xs text-saffron font-bold uppercase tracking-wider">
                {filtered[lightbox].cat}
              </span>
              <p className="text-white font-semibold mt-1">{filtered[lightbox].alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
