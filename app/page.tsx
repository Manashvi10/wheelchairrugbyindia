import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ImpactBanner from "./components/ImpactBanner";
import Stats from "./components/Stats";
import Events from "./components/Events";
import VisionMission from "./components/VisionMission";
import History from "./components/History";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import { getAllCMSSections } from "./lib/cms";
import pool from "./lib/db";

async function getTestimonials() {
  try {
    const [rows] = await pool.execute(
      "SELECT name, role, quote_text, avatar_url, rating FROM testimonials WHERE status = 'approved' ORDER BY sort_order ASC, id ASC"
    );
    return rows as Array<{ name: string; role: string; quote_text: string; avatar_url: string | null; rating: number }>;
  } catch { return []; }
}

export default async function Home() {
  const [cms, testimonials] = await Promise.all([
    getAllCMSSections(),
    getTestimonials(),
  ]);

  return (
    <>
      <Header />
      <main id="main-content">
        {cms.hero?.is_enabled !== false && <Hero data={cms.hero?.data} />}
        {cms.about?.is_enabled !== false && <About data={cms.about?.data} />}
        {cms.announcement?.is_enabled !== false && <ImpactBanner data={cms.announcement?.data} />}
        {cms.stats?.is_enabled !== false && <Stats data={cms.stats?.data as unknown[] | undefined} />}
        {cms.events?.is_enabled !== false && <Events />}
        {cms.vmv?.is_enabled !== false && <VisionMission data={cms.vmv?.data as unknown[] | undefined} />}
        {cms.timeline?.is_enabled !== false && <History data={cms.timeline?.data as unknown[] | undefined} />}
        {cms.gallery?.is_enabled !== false && <Gallery />}
        {cms.partners?.is_enabled !== false && <Sponsors />}
        {cms.contact?.is_enabled !== false && <Contact data={cms.contact?.data} />}
        {cms.testimonials?.is_enabled !== false && <Testimonials items={testimonials} />}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
