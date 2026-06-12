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

  const vis = (cms.sections_visibility?.data as Record<string, boolean>) ?? {};

  return (
    <>
      <Header />
      <main id="main-content">
        {vis.hero !== false && <Hero data={cms.hero?.data} />}
        {vis.about !== false && <About data={cms.about?.data} />}
        {vis.announcement !== false && <ImpactBanner data={cms.announcement?.data} />}
        {vis.stats !== false && <Stats data={cms.stats?.data as unknown[] | undefined} />}
        {vis.events !== false && <Events />}
        {vis.vmv !== false && <VisionMission data={cms.vmv?.data as unknown[] | undefined} />}
        {vis.timeline !== false && <History data={cms.timeline?.data as unknown[] | undefined} />}
        {vis.gallery !== false && <Gallery />}
        {vis.partners !== false && <Sponsors />}
        {vis.contact !== false && <Contact data={cms.contact?.data} />}
        {vis.testimonials !== false && <Testimonials items={testimonials} />}
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
