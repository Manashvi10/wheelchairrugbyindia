import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Documents"
      subtitle="PDFs, policy documents, registration forms and reports."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media Center" }, { label: "Documents" }]}
      features={["Upload PDFs / DOCX with version history", "Public / private visibility", "Categorize by type (policy, form, report)", "Direct shareable links"]}
    />
  );
}
