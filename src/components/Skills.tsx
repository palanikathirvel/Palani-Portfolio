import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Cpu,
  Terminal,
  Layout
} from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-primary to-primary/50",
  },
  {
    category: "Backend",
    icon: Terminal,
    skills: ["Node.js", "Python", "Go", "REST APIs", "GraphQL"],
    color: "from-secondary to-secondary/50",
  },
  {
    category: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
    color: "from-accent to-accent/50",
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    color: "from-primary to-accent",
  },
  {
    category: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "iOS", "Android"],
    color: "from-secondary to-primary",
  },
  {
    category: "AI & ML",
    icon: Cpu,
    skills: ["TensorFlow", "PyTorch", "OpenAI", "LangChain"],
    color: "from-accent to-secondary",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen py-20 overflow-hidden bg-muted/30">
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative h-full p-8 rounded-2xl glass-effect border border-border/50 hover:border-primary/50 transition-all duration-300">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-display font-bold mb-4">
                      {category.category}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="px-3 py-1 text-sm rounded-full bg-background/80 text-foreground border border-border/50"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
