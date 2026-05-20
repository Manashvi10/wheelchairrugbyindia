"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-slate-50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
            Get In Touch
          </span>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight"
          >
            Contact <span className="gradient-text">WRFI</span>
          </h2>
          <div className="section-divider mx-auto mt-6" />
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Have questions, want to volunteer, or looking to start a team in
            your state? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-navy mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-navy placeholder:text-slate-400 focus:bg-white focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-navy mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-navy placeholder:text-slate-400 focus:bg-white focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-navy mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-navy placeholder:text-slate-400 focus:bg-white focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-navy mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us more..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-navy placeholder:text-slate-400 focus:bg-white focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none resize-y"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-lg hover:shadow-saffron/30 pulse-cta"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-navy">
                Reach Us Directly
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Email</p>
                    <a
                      href="mailto:wcrfi.india@gmail.com"
                      className="text-slate-600 text-sm hover:text-saffron transition-colors"
                    >
                      wcrfi.india@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-india-green/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-india-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Phone</p>
                    <a
                      href="tel:+917223051792"
                      className="text-slate-600 text-sm hover:text-saffron transition-colors"
                    >
                      +91 7223051792
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Address</p>
                    <p className="text-slate-600 text-sm">
                      House no 53 shivlok phase 4
                      <br />
                      Khajurikalan Piplani Bhopal Madhya Pradesh 462022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/WCRFI/" },
                  { icon: TwitterIcon, label: "Twitter", href: "https://x.com/rugby_india" },
                  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/wcrugby_india/" },
                  { icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@WheelchairRugbyIndia" },
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-saffron hover:text-white hover:border-saffron transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick support */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white">
              <h3 className="font-bold text-lg mb-2">Need Quick Support?</h3>
              <p className="text-white text-sm mb-4">
                For urgent queries about events, registrations, or athlete
                support, reach out during office hours (Mon–Fri, 10AM–5PM IST).
              </p>
              <a
                href="tel:+917223051792"
                className="inline-flex items-center gap-2 text-saffron font-semibold text-sm hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
