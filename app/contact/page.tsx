"use client";

import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Loader2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

interface HeroData { eyebrow: string; title: string; description: string; enabled: boolean; }
interface FormCfg {
  title: string; helper: string; submit_text: string; recipient_email: string;
  reply_subject: string; reply_message: string; subjects: { value: string; label: string }[];
  enabled: boolean;
}
interface DetailsData {
  heading: string; hours_label: string; address: string; phone: string; phone_link: string;
  email: string; email_link: string; office_hours: string; enabled: boolean;
}
interface SocialData {
  heading: string; subtitle: string; links: { platform: string; url: string }[]; enabled: boolean;
}
interface MapCfg { title: string; embed_url: string; link_text: string; link_url: string; enabled: boolean; }
interface FAQItem { q: string; a: string; }
interface FAQCfg { title: string; items: FAQItem[]; enabled: boolean; }

const SOCIAL_ICONS: Record<string, ({ className }: { className?: string }) => React.JSX.Element> = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
};

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
  const [hero, setHero] = useState<HeroData>({
    eyebrow: "Reach Out",
    title: "Contact Us",
    description: "Have questions? Want to volunteer, start a team, or partner with us? We'd love to hear from you.",
    enabled: true,
  });
  const [form, setForm] = useState<FormCfg>({
    title: "Send Us a Message",
    helper: "Fill out the form below and our team will get back to you within 24–48 hours.",
    submit_text: "Send Message",
    recipient_email: "wcrfi.india@gmail.com",
    reply_subject: "",
    reply_message: "",
    subjects: [
      { value: "general", label: "General Inquiry" },
      { value: "join", label: "Join / Register as Athlete" },
      { value: "volunteer", label: "Volunteer" },
      { value: "sponsor", label: "Sponsorship / Partnership" },
      { value: "event", label: "Event Information" },
      { value: "media", label: "Media / Press" },
      { value: "other", label: "Other" },
    ],
    enabled: true,
  });
  const [details, setDetails] = useState<DetailsData>({
    heading: "Contact Details",
    hours_label: "Office Hours",
    address: "House no 53 shivlok phase 4\nKhajurikalan Piplani Bhopal Madhya Pradesh 462022",
    phone: "+91 7223051792",
    phone_link: "tel:+917223051792",
    email: "wcrfi.india@gmail.com",
    email_link: "mailto:wcrfi.india@gmail.com",
    office_hours: "Mon – Fri: 10:00 AM – 5:00 PM IST",
    enabled: true,
  });
  const [social, setSocial] = useState<SocialData>({
    heading: "Follow Us",
    subtitle: "Stay connected for the latest updates, events, and stories.",
    links: [
      { platform: "Facebook", url: "https://www.facebook.com/WCRFI/" },
      { platform: "Twitter", url: "https://x.com/rugby_india" },
      { platform: "Instagram", url: "https://www.instagram.com/wcrugby_india/" },
      { platform: "YouTube", url: "https://www.youtube.com/@WheelchairRugbyIndia" },
    ],
    enabled: true,
  });
  const [mapData, setMapData] = useState<MapCfg>({
    title: "WRFI Office Location",
    embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.3!2d77.4!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin",
    link_text: "Open in Maps",
    link_url: "https://maps.google.com/?q=WRFI+Bhopal",
    enabled: true,
  });
  const [faq, setFaq] = useState<FAQCfg>({
    title: "Frequently Asked Questions",
    items: [
      { q: "How can I join WRFI as an athlete?", a: "Fill out the contact form above with your details, or email us at wcrfi.india@gmail.com." },
      { q: "Does WRFI provide equipment and wheelchairs?", a: "Yes, WRFI provides rugby-specific wheelchairs and equipment to registered athletes." },
      { q: "How can I volunteer or support WRFI?", a: "We're always looking for volunteers. Reach out through the contact form." },
      { q: "How can my organization sponsor or partner with WRFI?", a: "Contact us with the 'Sponsorship / Partnership' subject for detailed information." },
    ],
    enabled: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/contact-sections");
        const { sections } = await res.json();
        if (sections) {
          if (sections.hero?.data) setHero(sections.hero.data as HeroData);
          if (sections.form?.data) setForm(sections.form.data as FormCfg);
          if (sections.details?.data) setDetails(sections.details.data as DetailsData);
          if (sections.social?.data) setSocial(sections.social.data as SocialData);
          if (sections.map?.data) setMapData(sections.map.data as MapCfg);
          if (sections.faq?.data) setFaq(sections.faq.data as FAQCfg);
        }
      } catch (e) {
        console.error("Failed to load contact sections:", e);
      }
    })();
  }, []);

  const [submission, setSubmission] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...submission, source: "contact" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus("error");
        setSubmitError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitStatus("success");
      setSubmission({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } catch {
      setSubmitStatus("error");
      setSubmitError("Network error. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Hero */}
        {hero.enabled && (
          <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 bg-navy overflow-hidden">
            <div className="pattern-overlay absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
              <span className="text-saffron font-semibold text-sm tracking-widest uppercase">
                {hero.eyebrow}
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                <span className="gradient-text">{hero.title}</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                {hero.description}
              </p>
              <div className="section-divider mt-6" />
            </div>
          </section>
        )}

        {/* Contact Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Contact Form */}
              {form.enabled && (
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-black text-navy mb-2">
                  {form.title}
                </h2>
                <p className="text-slate-500 mb-8">
                  {form.helper}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8 lg:p-10"
                  aria-label="Contact form"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" id="name" name="name"
                        value={submission.name}
                        onChange={(e) => setSubmission({ ...submission, name: e.target.value })}
                        placeholder="Your name" required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email" id="email" name="email"
                        value={submission.email}
                        onChange={(e) => setSubmission({ ...submission, email: e.target.value })}
                        placeholder="you@example.com" required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel" id="phone" name="phone"
                        value={submission.phone}
                        onChange={(e) => setSubmission({ ...submission, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-navy mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject" name="subject" required
                        value={submission.subject}
                        onChange={(e) => setSubmission({ ...submission, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
                      >
                        <option value="">Select a topic</option>
                        {form.subjects.map((s) => (
                          <option key={s.value} value={s.label}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={6}
                      value={submission.message}
                      onChange={(e) => setSubmission({ ...submission, message: e.target.value })}
                      placeholder="Tell us how we can help..." required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none resize-y"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="mt-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="mt-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                      {submitError || "Something went wrong. Please try again."}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-saffron hover:bg-saffron-dark text-white font-bold rounded-full text-lg transition-all hover:shadow-lg hover:shadow-saffron/30 pulse-cta disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === "submitting" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="w-5 h-5" /> {form.submit_text}</>
                    )}
                  </button>
                </form>
              </div>
              )}

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact details */}
                {details.enabled && (
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-navy mb-6">
                    {details.heading}
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">Address</p>
                        <p className="text-slate-500 text-sm mt-0.5 whitespace-pre-line">
                          {details.address}
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
                          href={details.phone_link}
                          className="text-slate-500 text-sm hover:text-saffron transition-colors"
                        >
                          {details.phone}
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
                          href={details.email_link}
                          className="text-slate-500 text-sm hover:text-saffron transition-colors"
                        >
                          {details.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">{details.hours_label}</p>
                        <p className="text-slate-500 text-sm mt-0.5">
                          {details.office_hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Social Media */}
                {social.enabled && (
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-navy mb-4">
                    {social.heading}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">
                    {social.subtitle}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {social.links.map((s, i) => {
                      const Icon = SOCIAL_ICONS[s.platform];
                      return (
                        <a
                          key={i}
                          href={s.url}
                          aria-label={s.platform}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-saffron hover:text-white hover:border-saffron transition-all"
                        >
                          {Icon ? <Icon className="w-5 h-5" /> : <span className="text-xs font-bold">{s.platform.slice(0, 2)}</span>}
                        </a>
                      );
                    })}
                  </div>
                </div>
                )}

                {/* Map */}
                {mapData.enabled && (
                <div className="rounded-2xl overflow-hidden border border-slate-100 h-[220px] bg-slate-100 relative">
                  <iframe
                    title={mapData.title}
                    src={mapData.embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / Quick help */}
        {faq.enabled && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                {faq.title}
              </h2>
              <div className="section-divider mx-auto mt-4" />
            </div>

            <div className="space-y-4">
              {faq.items.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-navy font-bold hover:text-saffron transition-colors list-none">
                    {item.q}
                    <span className="text-saffron ml-4 group-open:rotate-45 transition-transform text-xl font-bold">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        )}
      </main>
      <Footer />
    </>
  );
}
