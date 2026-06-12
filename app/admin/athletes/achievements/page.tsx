import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Athlete Achievements"
      subtitle="Centralized achievements log linked to athletes & events."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Athletes" }, { label: "Achievements" }]}
      features={["Achievement CRUD with athlete & event links", "Medal type, year, position, notes", "Bulk import from CSV", "Public visibility toggle"]}
    />
  );
}
