const galleryImages = [
  {
    src: "/images/g1.jpg",
    alt: "Wheelchair rugby match in action",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/g2.jpg",
    alt: "Athletes training on the court",
    span: "",
  },
  {
    src: "/images/g3.jpg",
    alt: "Team huddle before a game",
    span: "",
  },
  {
    src: "/images/g4.jpg",
    alt: "Championship celebration",
    span: "",
  },
  {
    src: "/images/g5.jpg",
    alt: "Coaching session with athletes",
    span: "",
  },
  {
    src: "/images/g6.jpg",
    alt: "National championship opening ceremony",
    span: "col-span-2",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Moments
          </span>
          <h2
            id="gallery-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            Photo <span className="gradient-text">Gallery</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-300 flex items-end">
                <p className="text-white text-sm font-medium p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
