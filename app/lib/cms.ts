import pool from "./db";

export type DBPartner = {
  id: number; name: string; logo_url: string | null;
  website: string; category: string; featured: number;
  status: string; sort_order: number;
};

function parseJSON(raw: unknown): unknown {
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return raw;
}

export async function getCMSSection<T = unknown>(key: string): Promise<{ data: T; is_enabled: boolean }> {
  try {
    const [rows] = await pool.execute(
      "SELECT data, is_enabled FROM homepage_sections WHERE section_key = ?",
      [key]
    );
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) return { data: null as T, is_enabled: true };
    return { data: parseJSON(row.data) as T, is_enabled: !!row.is_enabled };
  } catch {
    return { data: null as T, is_enabled: true };
  }
}

export async function getAllCMSSections(): Promise<Record<string, { data: unknown; is_enabled: boolean }>> {
  try {
    const [rows] = await pool.execute(
      "SELECT section_key, data, is_enabled FROM homepage_sections"
    );
    const result: Record<string, { data: unknown; is_enabled: boolean }> = {};
    for (const row of rows as Array<{ section_key: string; data: unknown; is_enabled: number }>) {
      result[row.section_key] = { data: parseJSON(row.data), is_enabled: !!row.is_enabled };
    }
    return result;
  } catch {
    return {};
  }
}

export async function getAboutSection<T = unknown>(key: string): Promise<{ data: T; is_enabled: boolean }> {
  try {
    const [rows] = await pool.execute(
      "SELECT data, is_enabled FROM about_sections WHERE section_key = ?",
      [key]
    );
    const row = (rows as Record<string, unknown>[])[0];
    if (!row) return { data: null as T, is_enabled: true };
    return { data: parseJSON(row.data) as T, is_enabled: !!row.is_enabled };
  } catch {
    return { data: null as T, is_enabled: true };
  }
}

export type DBCommitteeMember = {
  id: number; name: string; designation: string; bio: string | null;
  image_url: string | null; sort_order: number; is_active: number;
};

export async function getCommitteeMembers(): Promise<DBCommitteeMember[]> {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM committee_members WHERE is_active = 1 ORDER BY sort_order ASC, id ASC"
    );
    return rows as DBCommitteeMember[];
  } catch {
    return [];
  }
}

export async function getPartners(): Promise<DBPartner[]> {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM partners WHERE status = 'Active' ORDER BY sort_order ASC, featured DESC, id ASC"
    );
    return rows as DBPartner[];
  } catch {
    return [];
  }
}
