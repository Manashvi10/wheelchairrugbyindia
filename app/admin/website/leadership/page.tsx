import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Leadership Team — CMS"
      subtitle="Manage hero, team members (Mentor, Patron, President, etc.) and Join Mission section."
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Website Management" },
        { label: "Leadership Team" },
      ]}
      features={[
        "Leadership hero: title, subtitle, banner",
        "Team members CRUD: name, designation, category, photo, bio, social links",
        "Categories: Mentor / Patron / President / Vice President / Sports Director / Treasurer",
        "Display order with drag-and-drop and Active/Inactive status",
        "Join Mission CTA: title, description, button text & URL",
      ]}
    />
  );
}
