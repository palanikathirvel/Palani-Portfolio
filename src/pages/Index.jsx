import Hero from "@/components/Hero.jsx";
import Projects from "@/components/Projects.jsx";
import Internships from "@/components/Internships.jsx";
import Skills from "@/components/Skills.jsx";
import Contact from "@/components/Contact.jsx";
import CodingProfiles from "@/components/CodingProfiles.jsx";
import Achievements from "@/components/Achievements.jsx";
import Footer from "@/components/Footer.jsx";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Internships />
      <Skills />
      <Achievements />
      <CodingProfiles />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
