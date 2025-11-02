import { motion } from "framer-motion";
import { Heart, Edit2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { SiGithub, SiLinkedin, SiX, SiInstagram, SiYoutube } from "react-icons/si";
import { useData } from "@/contexts/DataContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ICON_MAP = {
    github: SiGithub,
    linkedin: SiLinkedin,
    twitter: SiX,
    instagram: SiInstagram,
    youtube: SiYoutube,
};

const Footer = () => {
    const { socialLinks } = useData();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <footer className="relative py-12 border-t border-border/50 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-6 mb-8 flex-wrap items-center"
                >
                    {socialLinks.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No social links yet</p>
                    ) : (
                        socialLinks.map((link, index) => {
                            const Icon = ICON_MAP[link.platform];
                            return (
                                <motion.a
                                    key={link.id}
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className="p-3 rounded-full glass-effect border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                                    aria-label={link.platform}
                                >
                                    {Icon && <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                                </motion.a>
                            );
                        })
                    )}

                    {isAuthenticated ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate("/admin")}
                            className="ml-4"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Links
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => navigate("/login")}
                            className="ml-4"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Admin Login
                        </Button>
                    )}
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-muted-foreground"
                >
                    <p className="flex items-center justify-center gap-2">
                        Made by Palani Kathirvel P
                    </p>
                    <p className="mt-2 text-sm">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
