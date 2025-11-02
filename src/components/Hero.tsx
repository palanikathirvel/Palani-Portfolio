import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "./ParticlesBackground";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground variant="hero" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 inline-block"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-pulse-glow" />
              <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Hi, I'm{" "}
            <span className="gradient-text">Your Name</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
          >
            A Passionate Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Creating innovative solutions with modern technologies. 
            Specializing in React, Node.js, and cloud architecture.
            Let's build something amazing together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Hire Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block cursor-pointer"
              onClick={() => scrollToSection("projects")}
            >
              <ArrowDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
