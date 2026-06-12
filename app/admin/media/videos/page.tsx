import PlaceholderPage from "../../components/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      title="Videos"
      subtitle="Manage video uploads, YouTube embeds and highlight reels."
      breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media Center" }, { label: "Videos" }]}
      features={["Upload to local storage or paste YouTube/Vimeo URL", "Auto-thumbnail generation", "Tag by event / athlete", "Featured video for homepage"]}
    />
  );
}
