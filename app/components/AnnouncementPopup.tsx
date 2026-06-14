"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

export interface PopupData {
  enabled: boolean;
  badge: string;
  heading: string;
  subheading: string;
  main_text: string;
  highlight_in_main: string;
  body_note: string;
  footer_text: string;
  highlight_in_footer: string;
  btn1_label: string;
  btn1_url: string;
  btn2_label: string;
  btn2_url: string;
  version: string;
}

export const DEFAULT_POPUP: PopupData = {
  enabled: true,
  badge: "Historic Moment",
  heading: "Congratulations!",
  subheading: "Team India",
  main_text: "We have qualified for the Asian Wheelchair Rugby Championship 🇮🇳",
  highlight_in_main: "Asian Wheelchair Rugby Championship",
  body_note: "Gratitude to all our partners, supporters and athletes for making this possible.",
  footer_text: "Our athletes proved that disability is never a limitation.",
  highlight_in_footer: "disability is never a limitation.",
  btn1_label: "Get Involved",
  btn1_url: "/contact",
  btn2_label: "Read More",
  btn2_url: "/news",
  version: "1",
};

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-saffron">{highlight}</span>}
        </span>
      ))}
    </>
  );
}

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    (async () => {
      try {
        const res = await fetch("/api/about-sections/home_popup", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            const merged: PopupData = { ...DEFAULT_POPUP, ...(json.data as PopupData), enabled: !!json.is_enabled };
            setPopup(merged);
            if (!merged.enabled) return;
            const key = `wrfi_popup_seen_v${merged.version}`;
            try { if (sessionStorage.getItem(key)) return; } catch {}
            setTimeout(() => setOpen(true), 1200);
            return;
          }
        }
      } catch {}
      const key = `wrfi_popup_seen_v${DEFAULT_POPUP.version}`;
      try { if (sessionStorage.getItem(key)) return; } catch {}
      setPopup(DEFAULT_POPUP);
      setTimeout(() => setOpen(true), 1200);
    })();
  }, [isAdmin]);

  const close = () => {
    setOpen(false);
    const key = `wrfi_popup_seen_v${popup?.version ?? DEFAULT_POPUP.version}`;
    try { sessionStorage.setItem(key, "1"); } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  if (!open || isAdmin || !popup) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
    >
      <button
        type="button"
        aria-label="Close announcement"
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-pop-in">
        <div className="h-1.5 bg-gradient-to-r from-saffron via-gold to-saffron-dark" />

        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-1.5 text-slate-500 hover:text-navy hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative bg-gradient-to-br from-navy via-navy to-[#0a1942] text-white px-6 pt-8 pb-6 text-center overflow-hidden">
          <Sparkles className="absolute top-4 left-4 w-4 h-4 text-saffron/60" />
          <Sparkles className="absolute bottom-4 right-6 w-3 h-3 text-gold/60" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 ring-2 ring-saffron/40 mb-4 p-2">
            <img src="/images/logo1.png" alt="WRFI Logo" className="w-full h-full object-contain" />
          </div>

          {popup.badge && (
            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-saffron/20 text-saffron text-[10px] font-bold uppercase tracking-widest">
              {popup.badge}
            </div>
          )}

          <h2
            id="announcement-title"
            className="text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight"
          >
            <span className="block text-saffron">{popup.heading}</span>
            {popup.subheading && (
              <span className="block mt-2 text-xl sm:text-2xl">{popup.subheading}</span>
            )}
          </h2>

          {popup.main_text && (
            <p className="mt-4 text-white text-base sm:text-lg font-semibold leading-snug">
              <HighlightText text={popup.main_text} highlight={popup.highlight_in_main} />
            </p>
          )}
        </div>

        <div className="px-6 py-5 text-center">
          {popup.body_note && (
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
              {popup.body_note}
            </p>
          )}
          {popup.footer_text && (
            <p className="mt-2 text-navy text-sm sm:text-base font-bold leading-snug">
              <HighlightText text={popup.footer_text} highlight={popup.highlight_in_footer} />
            </p>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <Link
              href={popup.btn1_url}
              onClick={close}
              className="flex-1 px-5 py-3 bg-saffron hover:bg-saffron-dark text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-saffron/25"
            >
              {popup.btn1_label}
            </Link>
            <Link
              href={popup.btn2_url}
              onClick={close}
              className="flex-1 px-5 py-3 border-2 border-navy text-navy hover:bg-navy hover:text-white text-sm font-bold rounded-full transition-colors"
            >
              {popup.btn2_label}
            </Link>
          </div>

          <button
            onClick={close}
            className="mt-3 text-xs text-slate-500 hover:text-navy transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards; }
      `}</style>
    </div>
  );
}
