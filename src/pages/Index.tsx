import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CodingProfiles from "@/components/CodingProfiles";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <Articles />
      <CodingProfiles />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
