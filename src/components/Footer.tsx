import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { 
  SiGithub, 
  SiLinkedin, 
  SiX, 
  SiInstagram, 
  SiYoutube 
} from "react-icons/si";

const socialLinks = [
  { icon: SiGithub, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: SiLinkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com/yourusername", label: "X (Twitter)" },
  { icon: SiInstagram, href: "https://instagram.com/yourusername", label: "Instagram" },
  { icon: SiYoutube, href: "https://youtube.com/@yourusername", label: "YouTube" },
];

const Footer = () => {
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
          className="flex justify-center gap-6 mb-8"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.1 }}
                className="p-3 rounded-full glass-effect border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-accent fill-accent animate-pulse" /> by Your Name
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
