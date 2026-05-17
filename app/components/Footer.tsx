"use client";

import { Accessibility, Heart, Send } from "lucide-react";

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

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "News", href: "#news" },
    { label: "Our History", href: "#history" },
    { label: "Events", href: "#events" },
    { label: "Contact Us", href: "#contact" },
  ],
  Resources: [
    { label: "Athlete Registration", href: "#" },
    { label: "Rules & Regulations", href: "#" },
    { label: "Coaching Programs", href: "#" },
    { label: "Equipment Guide", href: "#" },
    { label: "IWRF Official Site", href: "https://www.iwrf.com" },
  ],
};

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="bg-navy pt-16 sm:pt-20 pb-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div>
            <a href="#home" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                <Accessibility className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                WRFI
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Wheelchair Rugby Federation of India — empowering athletes,
              building champions, and championing inclusion through sport.
            </p>
            {/* Social media */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:bg-saffron hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns - Flex container for mobile */}
          <div className="flex gap-8 sm:contents">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex-1 sm:flex-none">
                <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-white/50 text-sm hover:text-saffron transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-5">
              Newsletter
            </h3>
            <p className="text-white/50 text-sm mb-4">
              Subscribe for the latest updates, events, and news from WRFI.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-saffron focus:ring-1 focus:ring-saffron/30 outline-none transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-saffron hover:bg-saffron-dark text-white rounded-lg transition-colors shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {/* Indian flag stripe */}
            <div className="flex gap-1 mt-6">
              <div className="w-10 h-1.5 rounded-full bg-saffron" />
              <div className="w-10 h-1.5 rounded-full bg-white" />
              <div className="w-10 h-1.5 rounded-full bg-india-green" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Wheelchair Rugby Federation of
            India. All rights reserved.
          </p>
          <p className="text-white/40 text-sm text-center sm:text-right flex items-center justify-center sm:justify-end gap-1">
            Developed with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Manashvi Jaiswal
          </p>
        </div>
      </div>
    </footer>
  );
}
