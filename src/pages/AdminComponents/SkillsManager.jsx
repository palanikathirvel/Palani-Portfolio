import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const SkillsManager = () => {
    const { skills, addSkill, updateSkill, deleteSkill } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        category: "",
        skillList: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = () => {
        if (!formData.category || !formData.skillList) {
            alert("Please fill in all fields");
            return;
        }

        const skillArray = formData.skillList
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);

        addSkill({
            category: formData.category,
            skills: skillArray,
        });

        setFormData({ category: "", skillList: "" });
        setIsAdding(false);
    };

    const handleEditSkill = (id) => {
        const skill = skills.find((s) => s.id === id);
        if (skill) {
            setFormData({
                category: skill.category,
                skillList: skill.skills.join(", "),
            });
            setEditingId(id);
        }
    };

    const handleUpdateSkill = () => {
        if (!formData.category || !formData.skillList) {
            alert("Please fill in all fields");
            return;
        }

        const skillArray = formData.skillList
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);

        updateSkill(editingId, {
            category: formData.category,
            skills: skillArray,
        });

        setFormData({ category: "", skillList: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Skills</h2>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill Category
                    </Button>
                )}
            </div>

            {(isAdding || editingId) && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Skill Category" : "Add Skill Category"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Category (e.g., Frontend, Backend) *</label>
                            <Input
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Skill category"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Skills (comma separated) *</label>
                            <Input
                                name="skillList"
                                value={formData.skillList}
                                onChange={handleInputChange}
                                placeholder="React, Vue.js, Angular"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={editingId ? handleUpdateSkill : handleAddSkill}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                {editingId ? "Update" : "Add"} Skill Category
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData({ category: "", skillList: "" });
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
                {skills.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No skills yet. Add your first skill category!</div>
                ) : (
                    skills.map((skill) => (
                        <Card key={skill.id} className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-3">{skill.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.skills.map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-muted text-sm rounded-full">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Button size="sm" variant="outline" onClick={() => handleEditSkill(skill.id)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteSkill(skill.id)}>
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

export default SkillsManager;
