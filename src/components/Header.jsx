import { motion } from "framer-motion";
import { Menu, X, LogIn, Sun, Moon, Edit2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useTheme } from "@/contexts/ThemeContext.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useData } from "@/contexts/DataContext.jsx";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { profile } = useData();

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["projects", "internships", "skills", "achievements", "coding-profiles"];
            let currentSection = "home";

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => {
        if (path === "/") return activeSection === "home";
        const sectionId = path.replace("/#", "");
        return activeSection === sectionId;
    };

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Projects", path: "/#projects" },
        { label: "Internships", path: "/#internships" },
        { label: "Skills", path: "/#skills" },
        { label: "Achievements", path: "/#achievements" },
        { label: "Coding Profiles", path: "/#coding-profiles" },
    ];

    const handleNavClick = (path) => {
        setIsMobileMenuOpen(false);
        if (path.includes("#")) {
            const sectionId = path.replace("/#", "");
            if (location.pathname === "/") {
                // Already on home page, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                // Navigate to home first, then scroll
                navigate("/");
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 100);
            }
        } else {
            navigate(path);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo - PK Icon */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0"
                    >
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-lg font-display font-bold gradient-text hidden sm:inline">
                                {profile.name.split(" ")[0]}
                            </span>
                        </button>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavClick(item.path)}
                                className={`text-sm font-medium transition-colors ${isActive(item.path)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-full"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </Button>

                        {/* Auth Button */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate("/admin")}
                                >
                                    <Edit2 className="w-4 h-4 mr-2" />
                                    Admin
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : null}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pt-4 border-t border-border/50 mt-4 space-y-2"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => handleNavClick(item.path)}
                                className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="pt-2 border-t border-border/50 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            navigate("/admin");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full"
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Admin
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : null}
                        </div>
                    </motion.nav>
                )}
            </div>
        </header>
    );
};

export default Header;
