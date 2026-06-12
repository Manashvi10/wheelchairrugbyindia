import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCommitteeMembers, getAboutSection } from "../lib/cms";

export const metadata = {
  title: "Leadership - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Meet the leadership team driving wheelchair rugby forward in India. Dedicated professionals committed to athlete development and inclusive sports.",
};

type PageData = {
  badge?: string; title?: string; title_gradient?: string; subtitle?: string;
  cta_title?: string; cta_subtitle?: string; cta_btn_text?: string; cta_btn_url?: string;
};

export default async function LeadershipPage() {
  const [members, pageR] = await Promise.all([
    getCommitteeMembers(),
    getAboutSection<PageData>("committee_page"),
  ]);

  const page = pageR.data ?? {};

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Page Hero */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
              {page.badge || "Our Leadership"}
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {page.title || "Meet Our"} <span className="gradient-text">{page.title_gradient || "Team"}</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
              {page.subtitle || "Dedicated leaders driving the growth of wheelchair rugby across India and empowering athletes with disabilities."}
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {members.length === 0 ? (
              <p className="text-center text-slate-400 text-lg py-20">No committee members to display.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {members.map((member) => (
                  <article
                    key={member.id}
                    className="card-hover group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
                  >
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-navy/5 to-navy-light/5">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-saffron/10">
                          <span className="text-6xl font-black text-navy/30">{member.name[0]}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <p className="text-saffron font-bold text-sm uppercase tracking-wider mb-2">
                        {member.designation}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-navy mb-3 leading-tight">
                        {member.name}
                      </h3>
                      {member.bio && (
                        <p className="text-slate-600 leading-relaxed text-sm">{member.bio}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {page.cta_title || "Join Our Mission"}
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              {page.cta_subtitle || "Together, we're building a stronger, more inclusive future for wheelchair rugby in India."}
            </p>
            <a
              href={page.cta_btn_url || "/contact"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
            >
              {page.cta_btn_text || "Get Involved"}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
