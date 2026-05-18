import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ImpactBanner from "./components/ImpactBanner";
import Stats from "./components/Stats";
import Events from "./components/Events";
import VisionMission from "./components/VisionMission";
import History from "./components/History";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <ImpactBanner />
        <Stats />
        <Events />
        <VisionMission />
        <History />
        <Gallery />
        <Sponsors />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
