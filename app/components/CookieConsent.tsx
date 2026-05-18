"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  // Mandatory consent: always shown on every visit until the user picks an option.
  // We intentionally do NOT persist the choice across visits so the banner is
  // guaranteed to appear on every (desktop OR mobile) page load — fixes the
  // "sometimes shows, sometimes not" mobile issue.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show once mounted on client (avoids SSR/hydration timing on mobile).
    setIsVisible(true);
  }, []);

  // Lock body scroll while modal is visible so it can't be missed on mobile.
  useEffect(() => {
    if (!isVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVisible]);

  const handleAcceptAll = () => {
    try { sessionStorage.setItem("wrfi-cookie-consent", "all"); } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try { sessionStorage.setItem("wrfi-cookie-consent", "essential"); } catch {}
    setIsVisible(false);
  };

  const handleCustomize = () => {
    try { sessionStorage.setItem("wrfi-cookie-consent", "custom"); } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header — no close button: user must pick a consent option */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-4 sm:py-6 rounded-t-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-navy">
              WRFI: We value your privacy.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-saffron font-semibold">
              Please choose a preference to continue.
            </p>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                We use cookies and similar technologies to improve your browsing
                experience, analyze website traffic, and enhance accessibility
                across our platform. These technologies help us understand how
                visitors interact with our website and allow us to provide a
                smoother, more personalized experience.
              </p>

              <p>
                WRFI is committed to protecting your privacy while promoting and
                developing Wheelchair Rugby in India. Some cookies are essential
                for the proper functioning of the website, while others help us
                improve our services, event updates, training information,
                athlete programs, and user experience.
              </p>

              <p>
                You can choose to accept all cookies, allow only essential
                cookies, or customize your preferences at any time. By
                continuing to use this website, you agree to our use of cookies
                in accordance with our{" "}
                <a
                  href="#"
                  className="text-saffron hover:text-saffron-dark font-semibold underline"
                >
                  Privacy & Cookie Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="sticky bottom-0 bg-gray-50 px-6 sm:px-8 py-4 sm:py-6 rounded-b-2xl border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleCustomize}
                className="px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-all text-sm sm:text-base"
              >
                Customise Cookies
              </button>
              <button
                onClick={handleEssentialOnly}
                className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all text-sm sm:text-base"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all text-sm sm:text-base"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
