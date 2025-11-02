import { motion } from "framer-motion";
import { Briefcase, Download, ArrowRight, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import ParticlesBackground from "./ParticlesBackground.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext.jsx";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { profile, resume, projects, skills, internships } = useData();

  const handleDownloadResume = () => {
    if (resume) {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "resume.pdf";
      link.click();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticlesBackground variant="hero" />

      <div className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Photo */}
            {profile.photo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1"
              >
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
            )}

            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">
                Hi, I'm <span className="gradient-text">{profile.name.split(" ")[0]}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-2">{profile.description}</p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/#projects")}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  View My Work
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                onClick={handleDownloadResume}
                disabled={!resume}
              >
                <Download className="w-5 h-5 mr-2" />
                {resume ? "Download Resume" : "No Resume"}
              </Button>

              {isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/admin")}
                >
                  <Edit2 className="w-5 h-5 mr-2" />
                  Edit Profile
                </Button>
              )}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-8"
            >
              <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
              <ArrowRight className="w-5 h-5 text-primary rotate-90" />
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Shape */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />

              {/* Main content box */}
              <div className="relative w-full h-full rounded-3xl border border-border/50 glass-effect p-8 flex flex-col justify-center items-center space-y-6">
                {profile.photo && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-2xl"
                  >
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </motion.div>
                )}

                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold mb-2">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.description}</p>
                </div>

                {/* Stats */}
                <div className="w-full grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  {[
                    { label: "Projects", value: projects.length },
                    { label: "Internships", value: internships.length },
                    { label: "Skills", value: skills.reduce((acc, s) => acc + s.skills.length, 0) },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg font-bold text-primary">{stat.value}+</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
