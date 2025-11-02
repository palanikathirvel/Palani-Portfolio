import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Save, Upload } from "lucide-react";

const ProfileManager = () => {
    const { profile, updateProfile } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-primary to-secondary"
                    >
                        Edit Profile
                    </Button>
                )}
            </div>

            <Card className="p-6">
                <div className="space-y-6">
                    {/* Photo Section */}
                    <div>
                        <label className="block text-sm font-medium mb-4">Profile Photo</label>
                        <div className="flex gap-6 items-start">
                            <div className="w-32 h-32 rounded-full bg-muted overflow-hidden flex-shrink-0">
                                {formData.photo ? (
                                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        No Photo
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex-1">
                                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                                        <div className="text-center">
                                            <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-sm font-medium">Click to upload photo</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing && <hr className="border-border/50" />}

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        {isEditing ? (
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your name"
                            />
                        ) : (
                            <p className="text-lg font-semibold">{formData.name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Bio / Description</label>
                        {isEditing ? (
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Brief description about yourself"
                                rows={4}
                            />
                        ) : (
                            <p className="text-muted-foreground">{formData.description}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex gap-2 pt-4 border-t border-border/50">
                            <Button
                                onClick={handleSave}
                                className="bg-gradient-to-r from-primary to-secondary"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button onClick={handleCancel} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ProfileManager;
