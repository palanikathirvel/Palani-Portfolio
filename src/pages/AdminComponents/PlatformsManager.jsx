import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const PLATFORMS = [
    { value: "github", label: "GitHub" },
    { value: "leetcode", label: "LeetCode" },
    { value: "hackerrank", label: "HackerRank" },
    { value: "codechef", label: "CodeChef" },
    { value: "skillrack", label: "SkillRack" },
];

const PlatformsManager = () => {
    const { codingPlatforms, addCodingPlatform, updateCodingPlatform, deleteCodingPlatform } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        count: "",
        link: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPlatform = () => {
        if (!formData.name || !formData.count) {
            alert("Please fill in all required fields");
            return;
        }

        addCodingPlatform({
            name: formData.name,
            count: parseInt(formData.count),
            link: formData.link,
        });

        setFormData({ name: "", count: "", link: "" });
        setIsAdding(false);
    };

    const handleEditPlatform = (id) => {
        const platform = codingPlatforms.find((p) => p.id === id);
        if (platform) {
            setFormData({
                name: platform.name,
                count: platform.count.toString(),
                link: platform.link,
            });
            setEditingId(id);
        }
    };

    const handleUpdatePlatform = () => {
        if (!formData.name || !formData.count) {
            alert("Please fill in all required fields");
            return;
        }

        updateCodingPlatform(editingId, {
            name: formData.name,
            count: parseInt(formData.count),
            link: formData.link,
        });

        setFormData({ name: "", count: "", link: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Coding Platforms</h2>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Platform
                    </Button>
                )}
            </div>

            {(isAdding || editingId) && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Platform" : "Add Platform"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Platform *</label>
                            <select
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border border-input rounded-md px-3 py-2 bg-background"
                            >
                                <option value="">Select a platform</option>
                                {PLATFORMS.map((p) => (
                                    <option key={p.value} value={p.value}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Count (e.g., Problems Solved) *</label>
                            <Input
                                name="count"
                                type="number"
                                value={formData.count}
                                onChange={handleInputChange}
                                placeholder="300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Profile Link</label>
                            <Input
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                placeholder="https://leetcode.com/username"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={editingId ? handleUpdatePlatform : handleAddPlatform}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                {editingId ? "Update" : "Add"} Platform
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData({ name: "", count: "", link: "" });
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
                {codingPlatforms.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No platforms added yet!</div>
                ) : (
                    codingPlatforms.map((platform) => {
                        const platformInfo = PLATFORMS.find((p) => p.value === platform.name);
                        return (
                            <Card key={platform.id} className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{platformInfo?.label || platform.name}</h3>
                                        <p className="text-lg text-primary font-semibold mb-2">{platform.count}+</p>
                                        {platform.link && (
                                            <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                                View Profile
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button size="sm" variant="outline" onClick={() => handleEditPlatform(platform.id)}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => deleteCodingPlatform(platform.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PlatformsManager;
