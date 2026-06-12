import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Tournament Registrations"
      subtitle="Review and approve athlete registrations across all events."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events & Tournaments" }, { label: "Registrations" }]}
      features={["Registration list grouped by event", "Approve / reject / waitlist actions", "Bulk email tools & CSV export", "Payment / verification status tracking"]}
    />
  );
}
