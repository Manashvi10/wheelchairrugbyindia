type AboutData = {
  video_url?: string; since_year?: string; section_badge?: string;
  title?: string; title_gradient?: string; body1?: string; body2?: string;
  btn1_text?: string; btn1_url?: string; btn2_text?: string; btn2_url?: string;
};

const DEFAULT_VIDEO =
  "https://www.youtube.com/embed/vZL79Cq20eo?autoplay=1&mute=1&loop=1&playlist=vZL79Cq20eo&controls=1&modestbranding=1&rel=0";

// Accepts embed URLs, watch?v= links, or youtu.be short links and returns a
// valid YouTube embed URL. Returns "" for empty/whitespace input.
function toEmbedUrl(raw?: string): string {
  if (!raw || !raw.trim()) return "";
  const url = raw.trim();
  const id =
    url.match(/youtu\.be\/([\w-]+)/)?.[1] ??
    url.match(/[?&]v=([\w-]+)/)?.[1] ??
    url.match(/youtube\.com\/embed\/([\w-]+)/)?.[1];
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&rel=0`;
  }
  return url;
}

export default function About({ data }: { data?: unknown }) {
  const d = (data as AboutData) ?? {};
  const videoUrl = toEmbedUrl(d.video_url) || DEFAULT_VIDEO;
  const sinceYear = d.since_year ?? "2009";
  const badge = d.section_badge ?? "About WRFI";
  const title = d.title ?? "Empowering Athletes,";
  const titleGrad = d.title_gradient ?? "Transforming Lives";
  const body1 = d.body1 ?? "The Wheelchair Rugby Federation of India (WRFI) is the official governing body for wheelchair rugby in the country. Affiliated with the International Wheelchair Rugby Federation (IWRF), WRFI has been championing inclusive sports since wheelchair rugby was introduced in India in 2009.";
  const body2 = d.body2 ?? "Our mission is to develop, promote, and make wheelchair rugby a mainstream competitive sport across India — empowering athletes with disabilities, building world-class teams, and representing India on the global stage.";
  const btn1Text = d.btn1_text ?? "Our Journey";
  const btn1Url = d.btn1_url ?? "#history";
  const btn2Text = d.btn2_text ?? "Our Mission";
  const btn2Url = d.btn2_url ?? "#vision";
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
                  src={videoUrl}
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
              <p className="text-navy font-black text-base sm:text-2xl">Since {sinceYear}</p>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">Wheelchair Rugby in India</p>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-6">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">{badge}</span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight"
            >
              {title}{" "}
              <span className="gradient-text">{titleGrad}</span>
            </h2>
            <div className="section-divider" />

            <p className="text-lg text-slate-600 leading-relaxed">{body1}</p>
            <p className="text-lg text-slate-600 leading-relaxed">{body2}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href={btn1Url} className="inline-flex items-center justify-center px-6 py-3 bg-navy hover:bg-navy-light text-white font-semibold rounded-full transition-all">{btn1Text}</a>
              <a href={btn2Url} className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy/20 hover:border-saffron text-navy font-semibold rounded-full transition-all">{btn2Text}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
