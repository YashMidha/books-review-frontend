import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { loginService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext.jsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please enter both email and password');
            return;
        }

        try {
            setLoading(true);
            const data = await loginService(formData);
            login(data.user, data.token);
            navigate("/");
        } catch (err) {
            const message =
                err.response?.data?.message || 'Something went wrong during login';
            toast.error(message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Welcome Back!</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                        </div>
                        <Button
                            type="submit"
                            className="bg-gray-900 hover:bg-gray-800 w-full h-11 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Log in'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/signup')} className="font-medium text-gray-900 hover:underline">
                            Sign up
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}