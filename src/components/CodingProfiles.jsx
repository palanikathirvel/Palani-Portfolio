import { motion } from "framer-motion";
import { ExternalLink, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { SiLeetcode, SiHackerrank, SiCodechef, SiGithub } from "react-icons/si";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const PLATFORM_ICONS = {
    github: SiGithub,
    leetcode: SiLeetcode,
    hackerrank: SiHackerrank,
    codechef: SiCodechef,
};

const PLATFORM_COLORS = {
    github: "from-gray-700 to-gray-900",
    leetcode: "from-orange-500 to-yellow-500",
    hackerrank: "from-green-500 to-emerald-600",
    codechef: "from-amber-600 to-orange-600",
    skillrack: "from-blue-500 to-purple-600",
};

const CodingProfiles = () => {
    const { codingPlatforms } = useData();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const getColor = (name) => PLATFORM_COLORS[name] || "from-primary to-secondary";
    const getIcon = (name) => PLATFORM_ICONS[name];

    return (
        <section id="coding-profiles" className="relative py-20 overflow-hidden bg-muted/30">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Coding <span className="gradient-text">Profiles</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {codingPlatforms.length === 0
                            ? "No platforms added yet. Login to add your achievements!"
                            : "Competitive programming achievements"}
                    </p>
                </motion.div>

                {codingPlatforms.length === 0 ? (
                    <div className="text-center py-12">
                        {isAuthenticated && (
                            <Button
                                onClick={() => navigate("/admin")}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Add Coding Platforms
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {codingPlatforms.map((platform, index) => {
                            const Icon = getIcon(platform.name);
                            const color = getColor(platform.name);
                            return (
                                <motion.a
                                    key={platform.id}
                                    href={platform.link || "#"}
                                    target={platform.link ? "_blank" : undefined}
                                    rel={platform.link ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative"
                                >
                                    <div className="relative h-full p-6 rounded-2xl glass-effect border border-border/50 hover:border-primary/50 transition-all">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />

                                        <div className="relative text-center">
                                            <div
                                                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${color} mb-4 group-hover:scale-110 transition-transform`}
                                            >
                                                {Icon && <Icon className="w-8 h-8 text-white" />}
                                            </div>

                                            <h3 className="text-xl font-display font-bold mb-2 capitalize">{platform.name}</h3>

                                            <p className="text-lg font-semibold text-primary mb-3">{platform.count}+</p>

                                            <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                                                {platform.link && (
                                                    <>
                                                        <span className="text-sm font-medium">View Profile</span>
                                                        <ExternalLink className="w-4 h-4" />
                                                    </>
                                                )}
                                            </div>

                                            {isAuthenticated && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="mt-2 w-full opacity-0 group-hover:opacity-100"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate("/admin");
                                                    }}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CodingProfiles;
