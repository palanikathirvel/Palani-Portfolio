import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }

        const success = login(username, password);
        if (success) {
            navigate("/admin");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-background rounded-lg shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-center mb-2 gradient-text">Portfolio</h1>
                    <h2 className="text-xl font-semibold text-center mb-8 text-muted-foreground">Admin Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full"
                            />
                        </div>

                        {error && <div className="bg-destructive/10 text-destructive p-3 rounded text-sm">{error}</div>}

                        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
                            Login
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Admin only login<br />
                       
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
