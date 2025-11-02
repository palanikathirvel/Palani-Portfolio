import { motion } from "framer-motion";
import { Calendar, Building2, Badge, Edit2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Internships = () => {
    const { internships } = useData();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <section id="internships" className="relative min-h-screen py-20 overflow-hidden bg-muted/30">
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
                        My <span className="gradient-text">Internships</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {internships.length === 0
                            ? "No internships yet"
                            : "Professional experience and learning journey"}
                    </p>
                </motion.div>

                {internships.length === 0 ? (
                    <div className="text-center py-12">
                        {isAuthenticated && (
                            <Button
                                onClick={() => navigate("/admin")}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Add Your First Internship
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        {internships.map((internship, index) => (
                            <motion.div
                                key={internship.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="mb-8"
                            >
                                <Card className="overflow-hidden border-border/50 glass-effect hover:shadow-2xl transition-all duration-500">
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Building2 className="w-5 h-5 text-primary" />
                                                    <h3 className="text-2xl font-display font-bold">
                                                        {internship.companyName}
                                                    </h3>
                                                </div>
                                                <p className="text-lg font-semibold text-gradient-text mb-1">
                                                    {internship.role}
                                                </p>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{internship.duration}</span>
                                                </div>
                                            </div>
                                            {isAuthenticated && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => navigate("/admin")}
                                                    className="mt-4 md:mt-0"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        {internship.description && (
                                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                                {internship.description}
                                            </p>
                                        )}

                                        {/* Tags/Technologies */}
                                        {internship.technologies && internship.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {internship.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-sm rounded-full bg-background/80 text-foreground border border-border/50 flex items-center gap-1"
                                                    >
                                                        <Badge className="w-3 h-3" />
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Certificate Link */}
                                        {internship.certificateUrl && (
                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r from-primary to-secondary"
                                                onClick={() => window.open(internship.certificateUrl, "_blank")}
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                View Certificate
                                            </Button>
                                        )}
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

export default Internships;
