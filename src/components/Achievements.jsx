import { motion } from "framer-motion";
import { Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Achievements = () => {
    const { achievements } = useData();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <section id="achievements" className="relative py-20 overflow-hidden">
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
                        My <span className="gradient-text">Achievements</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {achievements.length === 0
                            ? "No achievements yet. Login to add your accomplishments!"
                            : "Notable milestones and achievements in my career"}
                    </p>
                </motion.div>

                {achievements.length === 0 ? (
                    <div className="text-center py-12">
                        {isAuthenticated && (
                            <Button
                                onClick={() => navigate("/admin")}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Add Your First Achievement
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Card className="h-full overflow-hidden border-border/50 glass-effect hover:shadow-2xl transition-all duration-500">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-display font-bold group-hover:gradient-text transition-all flex-1">
                                                {achievement.title}
                                            </h3>
                                            {isAuthenticated && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="opacity-0 group-hover:opacity-100"
                                                    onClick={() => navigate("/admin")}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <p className="text-muted-foreground mb-4">{achievement.description}</p>

                                        {achievement.date && (
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                {achievement.date}
                                            </div>
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

export default Achievements;
