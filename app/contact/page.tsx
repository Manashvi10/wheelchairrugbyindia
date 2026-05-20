"use client";

import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

export default function ContactPage() {
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
              Reach Out
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
              Have questions? Want to volunteer, start a team, or partner with
              us? We&apos;d love to hear from you.
            </p>
            <div className="section-divider mt-6" />
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-black text-navy mb-2">
                  Send Us a Message
                </h2>
                <p className="text-slate-500 mb-8">
                  Fill out the form below and our team will get back to you
                  within 24–48 hours.
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 lg:p-10"
                  aria-label="Contact form"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-navy mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-navy mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-navy mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-navy mb-2"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="join">Join / Register as Athlete</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="sponsor">Sponsorship / Partnership</option>
                        <option value="event">Event Information</option>
                        <option value="media">Media / Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-navy mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us how we can help..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none resize-y"
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

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact details */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-navy mb-6">
                    Contact Details
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">Address</p>
                        <p className="text-slate-500 text-sm mt-0.5">
                          House no 53 shivlok phase 4
                          <br />
                          Khajurikalan Piplani Bhopal Madhya Pradesh 462022
                        </p>
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
                          className="text-slate-500 text-sm hover:text-saffron transition-colors"
                        >
                          +91 7223051792
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-accent/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-blue-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">Email</p>
                        <a
                          href="mailto:wcrfi.india@gmail.com"
                          className="text-slate-500 text-sm hover:text-saffron transition-colors"
                        >
                          wcrfi.india@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">Office Hours</p>
                        <p className="text-slate-500 text-sm mt-0.5">
                          Mon – Fri: 10:00 AM – 5:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-navy mb-4">
                    Follow Us
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">
                    Stay connected for the latest updates, events, and stories.
                  </p>
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
                          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-saffron hover:text-white hover:border-saffron transition-all"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden border border-slate-100 h-[220px] bg-slate-100 relative">
                  <iframe
                    title="WRFI Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3!2d77.4!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / Quick help */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                Frequently Asked Questions
              </h2>
              <div className="section-divider mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How can I join WRFI as an athlete?",
                  a: "Fill out the contact form above with your details, or email us at wcrfi.india@gmail.com. We welcome athletes with physical disabilities from all states of India.",
                },
                {
                  q: "Does WRFI provide equipment and wheelchairs?",
                  a: "Yes, WRFI provides rugby-specific wheelchairs and equipment to registered athletes through our equipment support programs.",
                },
                {
                  q: "How can I volunteer or support WRFI?",
                  a: "We're always looking for volunteers, coaches, and supporters. Reach out through the contact form or email us to learn about opportunities.",
                },
                {
                  q: "How can my organization sponsor or partner with WRFI?",
                  a: "We offer multiple sponsorship and partnership tiers. Contact us with the 'Sponsorship / Partnership' subject for detailed information.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-navy font-bold hover:text-saffron transition-colors list-none">
                    {faq.q}
                    <span className="text-saffron ml-4 group-open:rotate-45 transition-transform text-xl font-bold">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
