import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const InternshipsManager = () => {
    const { internships, addInternship, updateInternship, deleteInternship } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        companyName: "",
        role: "",
        duration: "",
        description: "",
        technologies: "",
        certificateUrl: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNew = () => {
        setFormData({
            companyName: "",
            role: "",
            duration: "",
            description: "",
            technologies: "",
            certificateUrl: "",
        });
        setEditingId(null);
        setIsAdding(true);
    };

    const handleEdit = (internship) => {
        setFormData({
            companyName: internship.companyName,
            role: internship.role,
            duration: internship.duration,
            description: internship.description,
            technologies: internship.technologies ? internship.technologies.join(", ") : "",
            certificateUrl: internship.certificateUrl || "",
        });
        setEditingId(internship.id);
        setIsAdding(true);
    };

    const handleSave = () => {
        if (!formData.companyName || !formData.role || !formData.duration) {
            alert("Please fill in all required fields");
            return;
        }

        const internshipData = {
            companyName: formData.companyName,
            role: formData.role,
            duration: formData.duration,
            description: formData.description,
            technologies: formData.technologies
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
            certificateUrl: formData.certificateUrl,
        };

        if (editingId) {
            updateInternship(editingId, internshipData);
        } else {
            addInternship(internshipData);
        }

        setIsAdding(false);
        setEditingId(null);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Internships Management</h2>
                {!isAdding && (
                    <Button
                        onClick={handleAddNew}
                        className="bg-gradient-to-r from-primary to-secondary"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Internship
                    </Button>
                )}
            </div>

            {/* Add/Edit Form */}
            {isAdding && (
                <Card className="p-6 border-border/50">
                    <h3 className="text-lg font-bold mb-4">
                        {editingId ? "Edit Internship" : "Add New Internship"}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Company Name *</label>
                            <Input
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Company name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Role *</label>
                            <Input
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                placeholder="Job title/Role"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Duration *</label>
                            <Input
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="e.g., Jan 2023 - Mar 2023"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="What did you work on?"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                            <Input
                                name="technologies"
                                value={formData.technologies}
                                onChange={handleInputChange}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Certificate URL</label>
                            <Input
                                name="certificateUrl"
                                value={formData.certificateUrl}
                                onChange={handleInputChange}
                                placeholder="Link to certificate or completion proof"
                            />
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border/50">
                            <Button
                                onClick={handleSave}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                Save
                            </Button>
                            <Button onClick={handleCancel} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Internships List */}
            <div className="space-y-4">
                {internships.length === 0 ? (
                    <Card className="p-6 text-center">
                        <p className="text-muted-foreground">No internships added yet</p>
                    </Card>
                ) : (
                    internships.map((internship) => (
                        <Card key={internship.id} className="p-6 border-border/50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{internship.companyName}</h3>
                                    <p className="text-primary font-semibold">{internship.role}</p>
                                    <p className="text-sm text-muted-foreground">{internship.duration}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(internship)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            if (confirm("Are you sure?")) {
                                                deleteInternship(internship.id);
                                            }
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {internship.description && (
                                <p className="text-muted-foreground mb-3">{internship.description}</p>
                            )}

                            {internship.technologies && internship.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {internship.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs rounded-full bg-muted text-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {internship.certificateUrl && (
                                <a
                                    href={internship.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    View Certificate →
                                </a>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default InternshipsManager;
