import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Athlete Categories"
      subtitle="Manage classifications used to group athletes."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Athletes" }, { label: "Categories" }]}
      features={["Create / edit / delete categories", "Color tags & icon picker", "Reorder via drag & drop", "Used for filtering on public site"]}
    />
  );
}
