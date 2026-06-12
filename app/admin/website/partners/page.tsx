import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Partners & Sponsors — CMS"
      subtitle="Manage sponsor categories, partner directory, hero and CTA."
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Website Management" },
        { label: "Partners & Sponsors" },
      ]}
      features={[
        "Hero: title, subtitle, banner",
        "Sponsor Categories CRUD (Title / Official / Supporting / Media)",
        "Partner CRUD: name, logo, category, website, description, dates, featured, priority, status",
        "Partner CTA: title, description, buttons",
      ]}
    />
  );
}
