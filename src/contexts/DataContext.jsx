import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'https://palani-portfolio-backend.vercel.app/api';
const BUILD_VERSION = '2.0.1'; // Updated API URL
console.log('API URL:', API_URL, 'Version:', BUILD_VERSION);

export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [codingPlatforms, setCodingPlatforms] = useState([]);
    const [socialLinks, setSocialLinks] = useState([]);
    const [internships, setInternships] = useState([]);
    const [profile, setProfile] = useState({
        name: "Palani Kathirvel P",
        description: "Full Stack Developer | Open Source Contributor",
        photo: "",
    });
    const [resume, setResume] = useState("");
    const [loading, setLoading] = useState(true);

    // Load data from MongoDB on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // Try to load from API, fallback to localStorage
                const [projectsRes, skillsRes, achievementsRes, platformsRes, socialLinksRes, internshipsRes, profileRes] = await Promise.allSettled([
                    fetch(`${API_URL}/projects`),
                    fetch(`${API_URL}/skills`),
                    fetch(`${API_URL}/achievements`),
                    fetch(`${API_URL}/platforms`),
                    fetch(`${API_URL}/social-links`),
                    fetch(`${API_URL}/internships`),
                    fetch(`${API_URL}/profile`)
                ]);

                // Process projects
                if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
                    const data = await projectsRes.value.json();
                    setProjects(data);
                } else {
                    const saved = localStorage.getItem("projects");
                    if (saved) setProjects(JSON.parse(saved));
                }

                // Process skills
                if (skillsRes.status === 'fulfilled' && skillsRes.value.ok) {
                    const data = await skillsRes.value.json();
                    setSkills(data);
                } else {
                    const saved = localStorage.getItem("skills");
                    if (saved) setSkills(JSON.parse(saved));
                }

                // Process achievements
                if (achievementsRes.status === 'fulfilled' && achievementsRes.value.ok) {
                    const data = await achievementsRes.value.json();
                    setAchievements(data);
                } else {
                    const saved = localStorage.getItem("achievements");
                    if (saved) setAchievements(JSON.parse(saved));
                }

                // Process platforms
                if (platformsRes.status === 'fulfilled' && platformsRes.value.ok) {
                    const data = await platformsRes.value.json();
                    setCodingPlatforms(data);
                } else {
                    const saved = localStorage.getItem("codingPlatforms");
                    if (saved) setCodingPlatforms(JSON.parse(saved));
                }

                // Process social links
                if (socialLinksRes.status === 'fulfilled' && socialLinksRes.value.ok) {
                    const data = await socialLinksRes.value.json();
                    setSocialLinks(data);
                } else {
                    const saved = localStorage.getItem("socialLinks");
                    if (saved) setSocialLinks(JSON.parse(saved));
                }

                // Process internships
                if (internshipsRes.status === 'fulfilled' && internshipsRes.value.ok) {
                    const data = await internshipsRes.value.json();
                    setInternships(data);
                } else {
                    const saved = localStorage.getItem("internships");
                    if (saved) setInternships(JSON.parse(saved));
                }

                // Process profile
                if (profileRes.status === 'fulfilled' && profileRes.value.ok) {
                    const data = await profileRes.value.json();
                    setProfile(data);
                } else {
                    const saved = localStorage.getItem("profile");
                    if (saved) setProfile(JSON.parse(saved));
                }

                const savedResume = localStorage.getItem("resume");
                if (savedResume) setResume(savedResume);
            } catch (error) {
                console.error('Error loading data:', error);
                // Fallback to localStorage
                const savedProjects = localStorage.getItem("projects");
                if (savedProjects) setProjects(JSON.parse(savedProjects));
                const savedSkills = localStorage.getItem("skills");
                if (savedSkills) setSkills(JSON.parse(savedSkills));
                const savedAchievements = localStorage.getItem("achievements");
                if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
                const savedPlatforms = localStorage.getItem("codingPlatforms");
                if (savedPlatforms) setCodingPlatforms(JSON.parse(savedPlatforms));
                const savedLinks = localStorage.getItem("socialLinks");
                if (savedLinks) setSocialLinks(JSON.parse(savedLinks));
                const savedInternships = localStorage.getItem("internships");
                if (savedInternships) setInternships(JSON.parse(savedInternships));
                const savedProfile = localStorage.getItem("profile");
                if (savedProfile) setProfile(JSON.parse(savedProfile));
                const savedResume = localStorage.getItem("resume");
                if (savedResume) setResume(savedResume);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Sync to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem("skills", JSON.stringify(skills));
    }, [skills]);

    useEffect(() => {
        localStorage.setItem("achievements", JSON.stringify(achievements));
    }, [achievements]);

    useEffect(() => {
        localStorage.setItem("codingPlatforms", JSON.stringify(codingPlatforms));
    }, [codingPlatforms]);

    useEffect(() => {
        localStorage.setItem("socialLinks", JSON.stringify(socialLinks));
    }, [socialLinks]);

    useEffect(() => {
        localStorage.setItem("internships", JSON.stringify(internships));
    }, [internships]);

    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem("resume", resume);
    }, [resume]);

    // Helper function to convert image to base64
    const convertImageToBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Save to MongoDB
    const syncToMongoDB = async (endpoint, data) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`Failed to sync to MongoDB: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error(`Error syncing to MongoDB: ${error.message}`);
        }
    };

    // Profile CRUD
    const updateProfile = async (newProfile) => {
        setProfile(newProfile);
        await syncToMongoDB('/profile', newProfile);
    };

    const updateResume = async (newResume) => {
        setResume(newResume);
        // Try to sync resume to MongoDB
        try {
            await fetch(`${API_URL}/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...profile, resume: newResume }),
            });
        } catch (error) {
            console.error('Error updating resume:', error);
        }
    };

    // Projects CRUD
    const addProject = async (project) => {
        try {
            const response = await fetch(`${API_URL}/projects`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
            if (!response.ok) throw new Error('Failed to add project');
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            return newProject;
        } catch (error) {
            console.error('Error adding project:', error);
            const newProject = { ...project, id: Date.now() };
            setProjects([...projects, newProject]);
            return newProject;
        }
    };

    const updateProject = async (id, updatedProject) => {
        try {
            const response = await fetch(`${API_URL}/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject),
            });
            if (!response.ok) throw new Error('Failed to update project');
            const updated = await response.json();
            setProjects(projects.map((p) => (p._id === id || p.id === id ? updated : p)));
        } catch (error) {
            console.error('Error updating project:', error);
            setProjects(projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)));
        }
    };

    const deleteProject = async (id) => {
        try {
            const response = await fetch(`${API_URL}/projects/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete project');
            setProjects(projects.filter((p) => p._id !== id && p.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    // Skills CRUD
    const addSkill = async (skill) => {
        try {
            const response = await fetch(`${API_URL}/skills`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill),
            });
            if (!response.ok) throw new Error('Failed to add skill');
            const newSkill = await response.json();
            setSkills([...skills, newSkill]);
            return newSkill;
        } catch (error) {
            console.error('Error adding skill:', error);
            const newSkill = { ...skill, id: Date.now() };
            setSkills([...skills, newSkill]);
            return newSkill;
        }
    };

    const updateSkill = async (id, updatedSkill) => {
        try {
            const response = await fetch(`${API_URL}/skills/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSkill),
            });
            if (!response.ok) throw new Error('Failed to update skill');
            const updated = await response.json();
            setSkills(skills.map((s) => (s._id === id || s.id === id ? updated : s)));
        } catch (error) {
            console.error('Error updating skill:', error);
            setSkills(skills.map((s) => (s.id === id ? { ...s, ...updatedSkill } : s)));
        }
    };

    const deleteSkill = async (id) => {
        try {
            const response = await fetch(`${API_URL}/skills/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete skill');
            setSkills(skills.filter((s) => s._id !== id && s.id !== id));
        } catch (error) {
            console.error('Error deleting skill:', error);
            setSkills(skills.filter((s) => s.id !== id));
        }
    };

    // Achievements CRUD
    const addAchievement = async (achievement) => {
        try {
            const response = await fetch(`${API_URL}/achievements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(achievement),
            });
            if (!response.ok) throw new Error('Failed to add achievement');
            const newAchievement = await response.json();
            setAchievements([...achievements, newAchievement]);
            return newAchievement;
        } catch (error) {
            console.error('Error adding achievement:', error);
            const newAchievement = { ...achievement, id: Date.now() };
            setAchievements([...achievements, newAchievement]);
            return newAchievement;
        }
    };

    const updateAchievement = async (id, updatedAchievement) => {
        try {
            const response = await fetch(`${API_URL}/achievements/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedAchievement),
            });
            if (!response.ok) throw new Error('Failed to update achievement');
            const updated = await response.json();
            setAchievements(achievements.map((a) => (a._id === id || a.id === id ? updated : a)));
        } catch (error) {
            console.error('Error updating achievement:', error);
            setAchievements(achievements.map((a) => (a.id === id ? { ...a, ...updatedAchievement } : a)));
        }
    };

    const deleteAchievement = async (id) => {
        try {
            const response = await fetch(`${API_URL}/achievements/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete achievement');
            setAchievements(achievements.filter((a) => a._id !== id && a.id !== id));
        } catch (error) {
            console.error('Error deleting achievement:', error);
            setAchievements(achievements.filter((a) => a.id !== id));
        }
    };

    // Coding Platforms CRUD
    const addCodingPlatform = async (platform) => {
        try {
            const response = await fetch(`${API_URL}/platforms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(platform),
            });
            if (!response.ok) throw new Error('Failed to add platform');
            const newPlatform = await response.json();
            setCodingPlatforms([...codingPlatforms, newPlatform]);
            return newPlatform;
        } catch (error) {
            console.error('Error adding platform:', error);
            const newPlatform = { ...platform, id: Date.now() };
            setCodingPlatforms([...codingPlatforms, newPlatform]);
            return newPlatform;
        }
    };

    const updateCodingPlatform = async (id, updatedPlatform) => {
        try {
            const response = await fetch(`${API_URL}/platforms/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPlatform),
            });
            if (!response.ok) throw new Error('Failed to update platform');
            const updated = await response.json();
            setCodingPlatforms(codingPlatforms.map((p) => (p._id === id || p.id === id ? updated : p)));
        } catch (error) {
            console.error('Error updating platform:', error);
            setCodingPlatforms(codingPlatforms.map((p) => (p.id === id ? { ...p, ...updatedPlatform } : p)));
        }
    };

    const deleteCodingPlatform = async (id) => {
        try {
            const response = await fetch(`${API_URL}/platforms/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete platform');
            setCodingPlatforms(codingPlatforms.filter((p) => p._id !== id && p.id !== id));
        } catch (error) {
            console.error('Error deleting platform:', error);
            setCodingPlatforms(codingPlatforms.filter((p) => p.id !== id));
        }
    };

    // Social Links CRUD
    const addSocialLink = async (link) => {
        try {
            const response = await fetch(`${API_URL}/social-links`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(link),
            });
            if (!response.ok) throw new Error('Failed to add social link');
            const newLink = await response.json();
            setSocialLinks([...socialLinks, newLink]);
            return newLink;
        } catch (error) {
            console.error('Error adding social link:', error);
            const newLink = { ...link, id: Date.now() };
            setSocialLinks([...socialLinks, newLink]);
            return newLink;
        }
    };

    const updateSocialLink = async (id, updatedLink) => {
        try {
            const response = await fetch(`${API_URL}/social-links/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLink),
            });
            if (!response.ok) throw new Error('Failed to update social link');
            const updated = await response.json();
            setSocialLinks(socialLinks.map((l) => (l._id === id || l.id === id ? updated : l)));
        } catch (error) {
            console.error('Error updating social link:', error);
            setSocialLinks(socialLinks.map((l) => (l.id === id ? { ...l, ...updatedLink } : l)));
        }
    };

    const deleteSocialLink = async (id) => {
        try {
            const response = await fetch(`${API_URL}/social-links/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete social link');
            setSocialLinks(socialLinks.filter((l) => l._id !== id && l.id !== id));
        } catch (error) {
            console.error('Error deleting social link:', error);
            setSocialLinks(socialLinks.filter((l) => l.id !== id));
        }
    };

    // Internships CRUD
    const addInternship = async (internship) => {
        try {
            const response = await fetch(`${API_URL}/internships`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(internship),
            });
            if (!response.ok) throw new Error('Failed to add internship');
            const newInternship = await response.json();
            setInternships([...internships, newInternship]);
            return newInternship;
        } catch (error) {
            console.error('Error adding internship:', error);
            const newInternship = { ...internship, id: Date.now() };
            setInternships([...internships, newInternship]);
            return newInternship;
        }
    };

    const updateInternship = async (id, updatedInternship) => {
        try {
            const response = await fetch(`${API_URL}/internships/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedInternship),
            });
            if (!response.ok) throw new Error('Failed to update internship');
            const updated = await response.json();
            setInternships(internships.map((i) => (i._id === id || i.id === id ? updated : i)));
        } catch (error) {
            console.error('Error updating internship:', error);
            setInternships(internships.map((i) => (i.id === id ? { ...i, ...updatedInternship } : i)));
        }
    };

    const deleteInternship = async (id) => {
        try {
            const response = await fetch(`${API_URL}/internships/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete internship');
            setInternships(internships.filter((i) => i._id !== id && i.id !== id));
        } catch (error) {
            console.error('Error deleting internship:', error);
            setInternships(internships.filter((i) => i.id !== id));
        }
    };

    return (
        <DataContext.Provider
            value={{
                loading,
                convertImageToBase64,
                skills,
                achievements,
                codingPlatforms,
                socialLinks,
                internships,
                profile,
                resume,
                updateProfile,
                updateResume,
                addProject,
                updateProject,
                deleteProject,
                addSkill,
                updateSkill,
                deleteSkill,
                addAchievement,
                updateAchievement,
                deleteAchievement,
                addCodingPlatform,
                updateCodingPlatform,
                deleteCodingPlatform,
                addSocialLink,
                updateSocialLink,
                deleteSocialLink,
                addInternship,
                updateInternship,
                deleteInternship,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within DataProvider");
    }
    return context;
};
