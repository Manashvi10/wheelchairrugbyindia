import type { Metadata } from "next";
import AdminShell from "./components/AdminShell";

export const metadata: Metadata = {
  title: "WRFI Admin Console",
  description: "Wheelchair Rugby Federation of India — Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
