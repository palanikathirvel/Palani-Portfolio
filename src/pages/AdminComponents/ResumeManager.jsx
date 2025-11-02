import React, { useState } from "react";
import { useData } from "@/contexts/DataContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Upload, Download, Trash2 } from "lucide-react";

const ResumeManager = () => {
    const { resume, updateResume } = useData();
    const [isUploading, setIsUploading] = useState(false);

    const handleResumeUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateResume(reader.result);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        if (resume) {
            const link = document.createElement("a");
            link.href = resume;
            link.download = "resume.pdf";
            link.click();
        }
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete the resume?")) {
            updateResume("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Resume Management</h2>
            </div>

            <Card className="p-6">
                <div className="space-y-4">
                    {resume ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                                <p className="text-sm font-medium mb-2">Current Resume</p>
                                <p className="text-sm text-muted-foreground mb-4">Resume has been uploaded successfully</p>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={handleDownload}
                                        className="bg-gradient-to-r from-primary to-secondary"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Resume
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={handleDelete}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4">
                                <p className="text-sm font-medium mb-3">Replace Resume</p>
                                <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-muted/20">
                                    <div className="text-center">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm font-medium">Click to upload new resume</p>
                                        <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <label className="flex items-center justify-center w-full p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                            <div className="text-center">
                                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                                <p className="text-lg font-medium mb-1">Upload Your Resume</p>
                                <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                                <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX up to 10MB</p>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ResumeManager;
