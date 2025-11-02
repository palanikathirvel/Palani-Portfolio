import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SiLeetcode, SiHackerrank, SiCodechef, SiGithub } from "react-icons/si";

const profiles = [
  {
    name: "GitHub",
    icon: SiGithub,
    stats: "500+ Contributions",
    link: "https://github.com/yourusername",
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    stats: "300+ Problems Solved",
    link: "https://leetcode.com/yourusername",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "HackerRank",
    icon: SiHackerrank,
    stats: "5★ Problem Solver",
    link: "https://hackerrank.com/yourusername",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "CodeChef",
    icon: SiCodechef,
    stats: "4★ Competitive Coder",
    link: "https://codechef.com/users/yourusername",
    color: "from-amber-600 to-orange-600",
  },
];

const CodingProfiles = () => {
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
            Competitive programming achievements and contributions
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <motion.a
                key={index}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl glass-effect border border-border/50 hover:border-primary/50 transition-all duration-300">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative text-center">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${profile.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-display font-bold mb-2">
                      {profile.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {profile.stats}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">View Profile</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
