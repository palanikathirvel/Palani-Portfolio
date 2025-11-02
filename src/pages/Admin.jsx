import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { LogOut } from "lucide-react";
import ProjectsManager from "./AdminComponents/ProjectsManager.jsx";
import SkillsManager from "./AdminComponents/SkillsManager.jsx";
import AchievementsManager from "./AdminComponents/AchievementsManager.jsx";
import PlatformsManager from "./AdminComponents/PlatformsManager.jsx";
import SocialLinksManager from "./AdminComponents/SocialLinksManager.jsx";
import InternshipsManager from "./AdminComponents/InternshipsManager.jsx";
import ProfileManager from "./AdminComponents/ProfileManager.jsx";
import ResumeManager from "./AdminComponents/ResumeManager.jsx";

const Admin = () => {
    const { logout, user } = useAuth();
    const { projects, skills, achievements, codingPlatforms, socialLinks, internships } = useData();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Portfolio Admin</h1>
                        <p className="text-sm opacity-90 mt-1">Welcome, {user?.username}</p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto p-6">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-8 mb-6">
                        <TabsTrigger value="resume">Resume</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
                        <TabsTrigger value="internships">Internships ({internships.length})</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements ({achievements.length})</TabsTrigger>
                        <TabsTrigger value="platforms">Platforms ({codingPlatforms.length})</TabsTrigger>
                        <TabsTrigger value="social">Social Links ({socialLinks.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="resume">
                        <ResumeManager />
                    </TabsContent>

                    <TabsContent value="profile">
                        <ProfileManager />
                    </TabsContent>

                    <TabsContent value="projects">
                        <ProjectsManager />
                    </TabsContent>

                    <TabsContent value="internships">
                        <InternshipsManager />
                    </TabsContent>

                    <TabsContent value="skills">
                        <SkillsManager />
                    </TabsContent>

                    <TabsContent value="achievements">
                        <AchievementsManager />
                    </TabsContent>

                    <TabsContent value="platforms">
                        <PlatformsManager />
                    </TabsContent>

                    <TabsContent value="social">
                        <SocialLinksManager />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
