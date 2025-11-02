import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ParticlesBackground from "./ParticlesBackground";

const projects = [
  {
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time analytics platform with ML-driven insights and predictive modeling",
    tech: ["React", "Python", "TensorFlow", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and inventory management",
    tech: ["Next.js", "Node.js", "Stripe", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    title: "Social Media App",
    description: "Real-time social platform with messaging, posts, and media sharing",
    tech: ["React Native", "Firebase", "Redux", "WebSocket"],
    github: "#",
    demo: "#",
  },
  {
    title: "Cloud Infrastructure Tool",
    description: "DevOps automation tool for cloud deployment and monitoring",
    tech: ["Go", "Docker", "Kubernetes", "AWS"],
    github: "#",
    demo: "#",
  },
];

const Projects = () => {
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
            A selection of my recent work showcasing innovation and technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
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
                  
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-muted/50 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
