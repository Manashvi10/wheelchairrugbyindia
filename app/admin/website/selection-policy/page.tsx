import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Selection Policy — CMS"
      subtitle="Manage hero, criteria cards, sortable steps, eligibility checklist, important notes & CTA."
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Website Management" },
        { label: "Selection Policy" },
      ]}
      features={[
        "Hero: title, subtitle, banner",
        "Selection Criteria: dynamic cards (title, description, icon)",
        "Selection Process: sortable numbered steps",
        "Eligibility Criteria: dynamic checklist",
        "Important Note: rich-text editor",
        "CTA section: title, description, two buttons",
      ]}
    />
  );
}
