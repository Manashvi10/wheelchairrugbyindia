const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "President",
    image:
      "/images/o.jpeg",
  },
  {
    name: "Priya Sharma",
    role: "Vice President",
    image:
      "/images/on.jpeg",
  },
  {
    name: "Amit Singh",
    role: "Head Coach",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Neha Patel",
    role: "Secretary General",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Vikram Rao",
    role: "Technical Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sunita Devi",
    role: "Women's Team Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="py-20 sm:py-28 bg-slate-50"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Leadership
          </span>
          <h2
            id="team-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="card-hover group text-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-saffron transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-navy text-sm sm:text-base">
                {member.name}
              </h3>
              <p className="text-saffron text-xs sm:text-sm font-medium mt-0.5">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
