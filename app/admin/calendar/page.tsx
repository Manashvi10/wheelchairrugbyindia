import PlaceholderPage from "../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Calendar"
      subtitle="Unified calendar view of events, registrations and content schedules."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Calendar" }]}
      features={["Month / week / day view", "Drag-to-reschedule events", "Color-coded by category", "Sync to Google Calendar / iCal"]}
    />
  );
}
