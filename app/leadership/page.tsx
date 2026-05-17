import Header from "../components/Header";
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Prabal Pratap Singh (Raghu Bhaiya)",
    role: "Mentor",
    image: "/images/o.jpeg",
    bio: "Guiding force behind WRFI's strategic vision and athlete development programs.",
  },
  {
    name: "Rajnish Jaiswal",
    role: "Patron",
    image: "/images/on.jpeg",
    bio: "Championing wheelchair rugby and supporting the federation's growth across India.",
  },
  {
    name: "Dr Vivek Parihar",
    role: "President and Director",
    image: "/images/image.png",
    bio: "Leading WRFI's mission to make wheelchair rugby a mainstream sport in India.",
  },
  {
    name: "Dr Pardeep Kumar Mahajan",
    role: "Vice President",
    image: "/images/img.png",
    bio: "Driving operational excellence and national program development.",
  },
  {
    name: "Mohammad Shahid",
    role: "Sports Director",
    image: "/images/imag.png",
    bio: "Overseeing athlete training, coaching programs, and competitive excellence.",
  },
  {
    name: "Swati Singh",
    role: "Treasurer",
    image: "/images/imgg.png",
    bio: "Managing financial operations and ensuring sustainable growth of the federation.",
  },
];

export const metadata = {
  title: "Leadership - WRFI | Wheelchair Rugby Federation of India",
  description:
    "Meet the leadership team driving wheelchair rugby forward in India. Dedicated professionals committed to athlete development and inclusive sports.",
};

export default function LeadershipPage() {
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
              Our Leadership
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Meet Our <span className="gradient-text">Team</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
              Dedicated leaders driving the growth of wheelchair rugby across
              India and empowering athletes with disabilities.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {teamMembers.map((member, i) => (
                <article
                  key={i}
                  className="card-hover group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="relative h-80 overflow-hidden bg-gradient-to-br from-navy/5 to-navy-light/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-saffron font-bold text-sm uppercase tracking-wider mb-2">
                      {member.role}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black text-navy mb-3 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 sm:py-20 bg-navy relative overflow-hidden">
          <div className="pattern-overlay absolute inset-0" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Together, we&apos;re building a stronger, more inclusive future for
              wheelchair rugby in India.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-xl hover:shadow-saffron/30 pulse-cta"
            >
              Get Involved
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
