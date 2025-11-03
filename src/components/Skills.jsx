import { motion } from "framer-motion";
import { Code2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Skills = () => {
    const { skills } = useData();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

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
                        {skills.length === 0 ? "No skills added yet" : "A comprehensive toolkit for modern development"}
                    </p>
                </motion.div>

                {skills.length === 0 ? (
                    <div className="text-center py-12">
                        {isAuthenticated && (
                            <Button onClick={() => navigate("/admin")} className="bg-gradient-to-r from-primary to-secondary">
                                <Edit2 className="w-4 h-4 mr-2" />
                                Add Skills
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {skills.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <div className="relative h-full p-8 rounded-2xl glass-effect border border-border/50 hover:border-primary/50 transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />

                                    <div className="relative">
                                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-secondary mb-4 group-hover:scale-110 transition-transform">
                                            <Code2 className="w-6 h-6 text-white" />
                                        </div>

                                        <h3 className="text-xl font-display font-bold mb-4">{category.category}</h3>

                                        <div className="flex flex-wrap gap-2">
                                            {category.skills && category.skills.length > 0 && category.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-sm rounded-full bg-background/80 text-foreground border border-border/50"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>

                                        {isAuthenticated && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="mt-4 opacity-0 group-hover:opacity-100"
                                                onClick={() => navigate("/admin")}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
