"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { login, getSession } from "../lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((s) => {
      if (s) router.replace("/admin");
    });
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const user = await login(email, password, remember);
    if (user) {
      window.location.href = "/admin";
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#012c5f] via-[#0B3D91] to-[#1b77a8]">
        <div className="absolute inset-0 pattern-overlay opacity-50" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-accent/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </Link>

          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <img src="/images/logo1.png" alt="WRFI" className="w-14 h-14 object-contain" />
              <div>
                <div className="text-2xl font-bold tracking-tight">WRFI</div>
                <div className="text-xs uppercase tracking-widest text-white/70">Admin Console</div>
              </div>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Manage every piece of <br />
              <span className="text-saffron">your federation</span> with ease.
            </h1>
            <p className="text-white/70 text-base max-w-md leading-relaxed">
              A production-grade content management system built specifically for the
              Wheelchair Rugby Federation of India.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-10 max-w-md">
              {[
                { k: "12+", v: "Modules" },
                { k: "5", v: "Page CMS" },
                { k: "Role", v: "Based Access" },
                { k: "Real-time", v: "Activity Logs" },
              ].map((item) => (
                <div key={item.v} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-saffron">{item.k}</div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Wheelchair Rugby Federation of India. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-navy text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to website
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            Secure Admin Access
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">
            Sign in to your WRFI admin account to manage website content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wrfi.org"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-saffron"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-saffron hover:text-saffron-dark font-semibold">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0B3D91] hover:bg-navy text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-[#0B3D91]/20 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
