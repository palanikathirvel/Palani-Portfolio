import { motion } from "framer-motion";
import { ExternalLink, Github, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import ParticlesBackground from "./ParticlesBackground.jsx";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { projects } = useData();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative min-h-screen py-20 overflow-hidden">
      <ParticlesBackground variant="default" />

      <div className="absolute top-40 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {projects.length === 0
              ? "No projects yet. Login to add your first project!"
              : "A selection of my recent work showcasing innovation and technical expertise"}
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            {isAuthenticated && (
              <Button
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-border/50 glass-effect hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8">
                    {/* Project number */}
                    <div className="text-6xl font-display font-bold text-muted/20 absolute top-4 right-4">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-sm rounded-full bg-muted/50 text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 flex-wrap">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/btn border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                          onClick={() => window.open(project.github, "_blank")}
                        >
                          <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                          Code
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                          onClick={() => window.open(project.demo, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {isAuthenticated && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate("/admin")}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
