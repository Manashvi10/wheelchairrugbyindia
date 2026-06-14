"use client";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const CACHE_KEY = "wrfi_admin_user";

export async function login(
  email: string,
  password: string,
  remember = false
): Promise<AdminUser | null> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof window !== "undefined" && data.user) {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.user));
    }
    return data.user ?? null;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {}
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CACHE_KEY);
  }
}

export async function getSession(): Promise<AdminUser | null> {
  if (typeof window !== "undefined") {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached) as AdminUser;
      } catch {}
    }
  }
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return null;
    const data = await res.json();
    if (data.user && typeof window !== "undefined") {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.user));
    }
    return data.user ?? null;
  } catch {
    return null;
  }
}
