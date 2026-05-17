export default function About() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/vZL79Cq20eo?autoplay=1&mute=1&loop=1&playlist=vZL79Cq20eo&controls=1&modestbranding=1&rel=0"
                  title="Wheelchair Rugby Federation of India"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-saffron/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-accent/10 rounded-full -z-10" />
            {/* Floating badge */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 py-2 sm:p-4 shadow-lg border border-slate-100">
              <p className="text-navy font-black text-base sm:text-2xl">Since 2009</p>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Wheelchair Rugby in India</p>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              About WRFI
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight"
            >
              Empowering Athletes,{" "}
              <span className="gradient-text">Transforming Lives</span>
            </h2>
            <div className="section-divider" />

            <p className="text-lg text-slate-600 leading-relaxed">
              The <strong className="text-navy">Wheelchair Rugby Federation of India (WRFI)</strong> is
              the official governing body for wheelchair rugby in the country.
              Affiliated with the International Wheelchair Rugby Federation
              (IWRF), WRFI has been championing inclusive sports since wheelchair
              rugby was introduced in India in <strong className="text-navy">2009</strong>.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our mission is to develop, promote, and make wheelchair rugby a
              mainstream competitive sport across India — empowering athletes
              with disabilities, building world-class teams, and representing
              India on the global stage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#history"
                className="inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy-light text-white font-semibold rounded-full transition-all"
              >
                Our Journey
              </a>
              <a
                href="#vision"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy/20 hover:border-saffron text-navy font-semibold rounded-full transition-all"
              >
                Our Mission
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
