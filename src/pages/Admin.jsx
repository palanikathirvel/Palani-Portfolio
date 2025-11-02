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
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 md:p-6 shadow-lg">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Portfolio Admin</h1>
                        <p className="text-xs md:text-sm opacity-90 mt-1">Welcome, {user?.username}</p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto p-4 md:p-6">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mb-6 h-auto">
                        <TabsTrigger value="resume" className="text-xs sm:text-sm">Resume</TabsTrigger>
                        <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
                        <TabsTrigger value="projects" className="text-xs sm:text-sm">Projects ({projects.length})</TabsTrigger>
                        <TabsTrigger value="internships" className="text-xs sm:text-sm">Internships ({internships.length})</TabsTrigger>
                        <TabsTrigger value="skills" className="text-xs sm:text-sm">Skills</TabsTrigger>
                        <TabsTrigger value="achievements" className="text-xs sm:text-sm">Achievements ({achievements.length})</TabsTrigger>
                        <TabsTrigger value="platforms" className="text-xs sm:text-sm">Platforms ({codingPlatforms.length})</TabsTrigger>
                        <TabsTrigger value="social" className="text-xs sm:text-sm">Social ({socialLinks.length})</TabsTrigger>
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
