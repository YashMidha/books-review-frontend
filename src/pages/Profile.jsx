import React, { useState } from 'react';
import ProfileSidebar from '@/components/ProfileSidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from 'react-router-dom';

const Profile = () => {
    return (
        <div>
            <SidebarProvider>
                <ProfileSidebar />
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    )
};

export default Profile;
