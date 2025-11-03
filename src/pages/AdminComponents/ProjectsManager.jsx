import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const ProjectsManager = () => {
    const { projects = [], addProject, updateProject, deleteProject } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech: "",
        github: "",
        demo: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProject = () => {
        if (!formData.title || !formData.description) {
            alert("Please fill in all required fields");
            return;
        }

        const techArray = formData.tech
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);

        addProject({
            title: formData.title,
            description: formData.description,
            tech: techArray,
            github: formData.github,
            demo: formData.demo,
        });

        setFormData({ title: "", description: "", tech: "", github: "", demo: "" });
        setIsAdding(false);
    };

    const handleEditProject = (id) => {
        const project = projects.find((p) => p.id === id || p._id === id);
        if (project) {
            setFormData({
                title: project.title,
                description: project.description,
                tech: Array.isArray(project.tech) ? project.tech.join(", ") : "",
                github: project.github || "",
                demo: project.demo || "",
            });
            setEditingId(id);
        }
    };

    const handleUpdateProject = () => {
        if (!formData.title || !formData.description) {
            alert("Please fill in all required fields");
            return;
        }

        const techArray = formData.tech
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);

        updateProject(editingId, {
            title: formData.title,
            description: formData.description,
            tech: techArray,
            github: formData.github,
            demo: formData.demo,
        });

        setFormData({ title: "", description: "", tech: "", github: "", demo: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Button>
                )}
            </div>

            {(isAdding || editingId) && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Project" : "Add New Project"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Project Title *</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Project title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description *</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Project description"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
                            <Input
                                name="tech"
                                value={formData.tech}
                                onChange={handleInputChange}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">GitHub Link</label>
                            <Input
                                name="github"
                                value={formData.github}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username/project"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Demo/Deploy Link</label>
                            <Input
                                name="demo"
                                value={formData.demo}
                                onChange={handleInputChange}
                                placeholder="https://project-demo.com"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={editingId ? handleUpdateProject : handleAddProject}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                {editingId ? "Update" : "Add"} Project
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData({ title: "", description: "", tech: "", github: "", demo: "" });
                                }}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid gap-4">
                {!Array.isArray(projects) || projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No projects yet. Add your first project!</div>
                ) : (
                    projects.map((project) => (
                        <Card key={project._id || project.id} className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {Array.isArray(project.tech) && project.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-muted text-xs rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                GitHub
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button size="sm" variant="outline" onClick={() => handleEditProject(project.id)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsManager;
