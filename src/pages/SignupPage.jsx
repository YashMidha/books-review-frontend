import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { signupService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext.jsx";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        profileImage: null,
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profileImage: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!formData.name || !formData.email || !formData.password) {
                toast.error('Please fill in all required fields: Name, Email, and Password.');
                return;
            }

            setLoading(true);

            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);
            if (formData.bio) {
                data.append('bio', formData.bio);
            }
            if (formData.profileImage) {
                data.append('profileImg', formData.profileImage);
            }

            const res = await signupService(data);

            login(res.user, res.token);
            toast.success("Account created successfully!");
            setLoading(false);
            navigate('/');

        } catch (err) {
            console.error('Signup failed:', err);
            toast.error('Something went wrong');
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Join our community of book lovers</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input id="name" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" placeholder="Enter bio" value={formData.bio} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label>Profile Picture</Label>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>
                                <Label htmlFor="profileImage" className="cursor-pointer">
                                    <Button type="button" variant="outline" as="span" onClick={() => document.getElementById('profileImage').click()}>
                                        Upload Image
                                    </Button>
                                </Label>
                                <Input id="profileImage" name="profileImage" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="bg-gray-900 hover:bg-gray-800 w-full h-11 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="font-medium text-gray-900 hover:underline">
                            Log in
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}