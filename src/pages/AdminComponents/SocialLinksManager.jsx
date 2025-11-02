import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Trash2, Edit2, Plus } from "lucide-react";

const SOCIAL_PLATFORMS = [
    { value: "github", label: "GitHub", icon: "🔗" },
    { value: "linkedin", label: "LinkedIn", icon: "💼" },
    { value: "twitter", label: "Twitter", icon: "🐦" },
    { value: "instagram", label: "Instagram", icon: "📸" },
    { value: "youtube", label: "YouTube", icon: "🎬" },
];

const SocialLinksManager = () => {
    const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        platform: "",
        link: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddLink = () => {
        if (!formData.platform || !formData.link) {
            alert("Please fill in all required fields");
            return;
        }

        addSocialLink({
            platform: formData.platform,
            link: formData.link,
        });

        setFormData({ platform: "", link: "" });
        setIsAdding(false);
    };

    const handleEditLink = (id) => {
        const link = socialLinks.find((l) => l.id === id);
        if (link) {
            setFormData({
                platform: link.platform,
                link: link.link,
            });
            setEditingId(id);
        }
    };

    const handleUpdateLink = () => {
        if (!formData.platform || !formData.link) {
            alert("Please fill in all required fields");
            return;
        }

        updateSocialLink(editingId, {
            platform: formData.platform,
            link: formData.link,
        });

        setFormData({ platform: "", link: "" });
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Social Links</h2>
                {!isAdding && !editingId && (
                    <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Social Link
                    </Button>
                )}
            </div>

            {(isAdding || editingId) && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Social Link" : "Add Social Link"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Platform *</label>
                            <select
                                name="platform"
                                value={formData.platform}
                                onChange={handleInputChange}
                                className="w-full border border-input rounded-md px-3 py-2 bg-background"
                            >
                                <option value="">Select a platform</option>
                                {SOCIAL_PLATFORMS.map((p) => (
                                    <option key={p.value} value={p.value}>
                                        {p.icon} {p.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Profile Link *</label>
                            <Input
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={editingId ? handleUpdateLink : handleAddLink}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                {editingId ? "Update" : "Add"} Link
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData({ platform: "", link: "" });
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
                {socialLinks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No social links added yet!</div>
                ) : (
                    socialLinks.map((item) => {
                        const platformInfo = SOCIAL_PLATFORMS.find((p) => p.value === item.platform);
                        return (
                            <Card key={item.id} className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">
                                            {platformInfo?.icon} {platformInfo?.label || item.platform}
                                        </h3>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                                            {item.link}
                                        </a>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button size="sm" variant="outline" onClick={() => handleEditLink(item.id)}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => deleteSocialLink(item.id)}>
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

export default SocialLinksManager;
