import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const articles = [
  {
    title: "Building Scalable Microservices with Node.js",
    excerpt: "A comprehensive guide to architecting and deploying production-ready microservices using Node.js and Docker",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    link: "#",
    category: "Backend",
  },
  {
    title: "Advanced React Patterns for 2024",
    excerpt: "Exploring modern React patterns including Server Components, Suspense, and advanced state management techniques",
    date: "Feb 28, 2024",
    readTime: "10 min read",
    link: "#",
    category: "Frontend",
  },
  {
    title: "AI Integration in Modern Web Apps",
    excerpt: "How to leverage AI APIs and machine learning models to enhance user experience in web applications",
    date: "Feb 10, 2024",
    readTime: "12 min read",
    link: "#",
    category: "AI/ML",
  },
];

const Articles = () => {
  return (
    <section id="articles" className="relative py-20 overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and tutorials on modern web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/50 glass-effect hover:shadow-2xl transition-all duration-500">
                {/* Category badge */}
                <div className="p-6 pb-0">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:gradient-text transition-all">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-medium"
                    onClick={() => window.open(article.link, "_blank")}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
