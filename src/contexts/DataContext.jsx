import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

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

    // Load data from localStorage on mount
    useEffect(() => {
        const savedProjects = localStorage.getItem("projects");
        const savedSkills = localStorage.getItem("skills");
        const savedAchievements = localStorage.getItem("achievements");
        const savedCodingPlatforms = localStorage.getItem("codingPlatforms");
        const savedSocialLinks = localStorage.getItem("socialLinks");
        const savedInternships = localStorage.getItem("internships");
        const savedProfile = localStorage.getItem("profile");

        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedSkills) setSkills(JSON.parse(savedSkills));
        if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
        if (savedCodingPlatforms) setCodingPlatforms(JSON.parse(savedCodingPlatforms));
        if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks));
        if (savedInternships) setInternships(JSON.parse(savedInternships));
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        const savedResume = localStorage.getItem("resume");
        if (savedResume) setResume(savedResume);
    }, []);

    // Save to localStorage whenever data changes
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

    // Profile CRUD
    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    };

    const updateResume = (newResume) => {
        setResume(newResume);
    };

    // Projects CRUD
    const addProject = (project) => {
        const newProject = { ...project, id: Date.now() };
        setProjects([...projects, newProject]);
        return newProject;
    };

    const updateProject = (id, updatedProject) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)));
    };

    const deleteProject = (id) => {
        setProjects(projects.filter((p) => p.id !== id));
    };

    // Skills CRUD
    const addSkill = (skill) => {
        const newSkill = { ...skill, id: Date.now() };
        setSkills([...skills, newSkill]);
        return newSkill;
    };

    const updateSkill = (id, updatedSkill) => {
        setSkills(skills.map((s) => (s.id === id ? { ...s, ...updatedSkill } : s)));
    };

    const deleteSkill = (id) => {
        setSkills(skills.filter((s) => s.id !== id));
    };

    // Achievements CRUD
    const addAchievement = (achievement) => {
        const newAchievement = { ...achievement, id: Date.now() };
        setAchievements([...achievements, newAchievement]);
        return newAchievement;
    };

    const updateAchievement = (id, updatedAchievement) => {
        setAchievements(achievements.map((a) => (a.id === id ? { ...a, ...updatedAchievement } : a)));
    };

    const deleteAchievement = (id) => {
        setAchievements(achievements.filter((a) => a.id !== id));
    };

    // Coding Platforms CRUD
    const addCodingPlatform = (platform) => {
        const newPlatform = { ...platform, id: Date.now() };
        setCodingPlatforms([...codingPlatforms, newPlatform]);
        return newPlatform;
    };

    const updateCodingPlatform = (id, updatedPlatform) => {
        setCodingPlatforms(codingPlatforms.map((p) => (p.id === id ? { ...p, ...updatedPlatform } : p)));
    };

    const deleteCodingPlatform = (id) => {
        setCodingPlatforms(codingPlatforms.filter((p) => p.id !== id));
    };

    // Social Links CRUD
    const addSocialLink = (link) => {
        const newLink = { ...link, id: Date.now() };
        setSocialLinks([...socialLinks, newLink]);
        return newLink;
    };

    const updateSocialLink = (id, updatedLink) => {
        setSocialLinks(socialLinks.map((l) => (l.id === id ? { ...l, ...updatedLink } : l)));
    };

    const deleteSocialLink = (id) => {
        setSocialLinks(socialLinks.filter((l) => l.id !== id));
    };

    // Internships CRUD
    const addInternship = (internship) => {
        const newInternship = { ...internship, id: Date.now() };
        setInternships([...internships, newInternship]);
        return newInternship;
    };

    const updateInternship = (id, updatedInternship) => {
        setInternships(internships.map((i) => (i.id === id ? { ...i, ...updatedInternship } : i)));
    };

    const deleteInternship = (id) => {
        setInternships(internships.filter((i) => i.id !== id));
    };

    return (
        <DataContext.Provider
            value={{
                projects,
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
