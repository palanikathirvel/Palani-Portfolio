import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const AchievementsManager = () => {
    const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAchievement = () => {
        if (!formData.title || !formData.description) {
            alert("Please fill in all required fields");
            return;
        }

        addAchievement({
            title: formData.title,
            description: formData.description,
            date: formData.date || new Date().toISOString().split("T")[0],
        });

        setFormData({ title: "", description: "", date: "" });
        setIsAdding(false);
    };

    const handleEditAchievement = (id) => {
        const achievement = achievements.find((a) => a.id === id);
        if (achievement) {
            setFormData({
                title: achievement.title,
                description: achievement.description,
                date: achievement.date,
            });
            setEditingId(id);
        }
    };

    const handleUpdateAchievement = () => {
        if (!formData.title || !formData.description) {
            alert("Please fill in all required fields");
            return;
        }

        updateAchievement(editingId, {
            title: formData.title,
            description: formData.description,
            date: formData.date,
        });

        setFormData({ title: "", description: "", date: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Achievements</h2>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Achievement
                    </Button>
                )}
            </div>

            {(isAdding || editingId) && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Achievement" : "Add Achievement"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Achievement Title *</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Achievement title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description *</label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Achievement description"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <Input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={editingId ? handleUpdateAchievement : handleAddAchievement}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                {editingId ? "Update" : "Add"} Achievement
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData({ title: "", description: "", date: "" });
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
                {achievements.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No achievements yet. Add your first achievement!</div>
                ) : (
                    achievements.map((achievement) => (
                        <Card key={achievement.id} className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                                        {achievement.date && <span className="text-sm text-muted-foreground">{achievement.date}</span>}
                                    </div>
                                    <p className="text-muted-foreground">{achievement.description}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button size="sm" variant="outline" onClick={() => handleEditAchievement(achievement.id)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteAchievement(achievement.id)}>
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

export default AchievementsManager;
