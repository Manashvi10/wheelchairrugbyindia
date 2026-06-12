import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Past Events"
      subtitle="Archive of completed tournaments and friendlies."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events & Tournaments" }, { label: "Past Events" }]}
      features={["Archived events list with filters", "Final results, gallery & report attachments", "Restore / unarchive option", "Export to CSV/PDF"]}
    />
  );
}
