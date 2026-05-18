// AI-styled fictional partner brand logos rendered as inline SVG so they
// look modern, crisp on any screen, and need no external assets.

import type { JSX } from "react";

export type PartnerLogo = {
  name: string;
  tagline?: string;
  svg: JSX.Element;
};

const wrap = (children: JSX.Element) => (
  <svg viewBox="0 0 200 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export const partnerLogos: PartnerLogo[] = [
  {
    name: "Apex Mobility",
    tagline: "Wheelchair Tech Partner",
    svg: wrap(
      <>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <polygon points="14,52 30,18 46,52 38,52 30,32 22,52" fill="url(#g1)" />
        <text x="58" y="46" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="20" fill="#012c5f" letterSpacing="1">
          APEX
        </text>
        <text x="58" y="62" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="10" fill="#475569" letterSpacing="3">
          MOBILITY
        </text>
      </>
    ),
  },
  {
    name: "Bharat Sports",
    tagline: "Title Sponsor",
    svg: wrap(
      <>
        <circle cx="28" cy="40" r="18" fill="#012c5f" />
        <path d="M22 32 L34 40 L22 48 Z" fill="#f97316" />
        <text x="54" y="44" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" fill="#012c5f">
          BHARAT
        </text>
        <text x="54" y="60" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10" fill="#15803d" letterSpacing="2">
          SPORTS GROUP
        </text>
      </>
    ),
  },
  {
    name: "NovaPlay",
    tagline: "Broadcast Partner",
    svg: wrap(
      <>
        <defs>
          <linearGradient id="g2" x1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="1" stopColor="#1b77a8" />
          </linearGradient>
        </defs>
        <rect x="10" y="22" width="36" height="36" rx="10" fill="url(#g2)" />
        <path d="M20 30 L20 50 L38 40 Z" fill="#fff" />
        <text x="56" y="46" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="20" fill="#012c5f">
          Nova
          <tspan fill="#2563eb">Play</tspan>
        </text>
      </>
    ),
  },
  {
    name: "Vajra Pharma",
    tagline: "Healthcare Partner",
    svg: wrap(
      <>
        <g transform="translate(14,18)">
          <path d="M16 0 L32 16 L16 32 L0 16 Z" fill="#15803d" />
          <path d="M14 8 H18 V14 H24 V18 H18 V24 H14 V18 H8 V14 H14 Z" fill="#fff" />
        </g>
        <text x="58" y="44" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="#012c5f">
          VAJRA
        </text>
        <text x="58" y="60" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="10" fill="#15803d" letterSpacing="2">
          PHARMA
        </text>
      </>
    ),
  },
  {
    name: "Stride Athletics",
    tagline: "Apparel Partner",
    svg: wrap(
      <>
        <path d="M10 54 Q22 18 50 32 Q34 38 26 54 Z" fill="#012c5f" />
        <circle cx="44" cy="28" r="4" fill="#f97316" />
        <text x="58" y="44" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" fill="#012c5f" letterSpacing="0">
          STRIDE
        </text>
        <text x="58" y="60" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="10" fill="#475569" letterSpacing="2">
          ATHLETICS
        </text>
      </>
    ),
  },
  {
    name: "Helix Foundation",
    tagline: "Charity Partner",
    svg: wrap(
      <>
        <g transform="translate(16,20)" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M2 4 C 22 14, 2 26, 22 36" />
          <path d="M22 4 C 2 14, 22 26, 2 36" />
        </g>
        <text x="58" y="44" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="17" fill="#012c5f">
          HELIX
        </text>
        <text x="58" y="60" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9" fill="#475569" letterSpacing="2">
          FOUNDATION
        </text>
      </>
    ),
  },
  {
    name: "Orbit Bank",
    tagline: "Banking Partner",
    svg: wrap(
      <>
        <circle cx="28" cy="40" r="16" fill="none" stroke="#012c5f" strokeWidth="3" />
        <circle cx="28" cy="40" r="6" fill="#f97316" />
        <circle cx="42" cy="28" r="3" fill="#012c5f" />
        <text x="56" y="44" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="19" fill="#012c5f">
          ORBIT
        </text>
        <text x="56" y="60" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10" fill="#2563eb" letterSpacing="3">
          BANK
        </text>
      </>
    ),
  },
  {
    name: "PrimeFuel",
    tagline: "Energy Partner",
    svg: wrap(
      <>
        <defs>
          <linearGradient id="g3" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ea580c" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d="M28 14 C 18 28, 18 42, 28 58 C 38 42, 38 28, 28 14 Z" fill="url(#g3)" />
        <text x="50" y="44" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="18" fill="#012c5f">
          Prime
          <tspan fill="#f97316">Fuel</tspan>
        </text>
        <text x="50" y="60" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="9" fill="#475569" letterSpacing="2">
          ENERGY CO.
        </text>
      </>
    ),
  },
];
