import React from 'react'
import {
  LayoutDashboard,
  BookMarked,
  MessageSquareText,
  Settings2,
  Copyright,
  ChevronDown,
  ListTodo,
  BookOpen,
  Check,
  ListChecks,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.jsx'

const ProfileSidebar = () => {

  const {user} = useAuth();

  return (
    <Sidebar className="h-screen w-64 border-r shadow-sm">
      <SidebarContent>
        
        <div className="flex items-center gap-3 px-4 py-6 border-b md:border-b-0 text-xl">
          <img src={user.profileImg} alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium text-base">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pt-6 pb-2 text-xs text-muted-foreground">
            Profile
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 text-base font-normal">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex items-center gap-3 px-3 py-2 text-base font-normal cursor-pointer">
                    <BookMarked className="h-4 w-4 font-normal" />
                    <span>My List</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/profile/list/reading" className="flex items-center gap-3 pl-8 py-2 text-base">
                            <ListTodo className="h-4 w-4" />
                            <span>Reading</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/profile/list/plan-to-read" className="flex items-center gap-3 pl-8 py-2 text-base">
                            <BookOpen className="h-4 w-4" />
                            <span>Plan to Read</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/profile/list/completed" className="flex items-center gap-3 pl-8 py-2 text-base">
                            <Check className="h-4 w-4" />
                            <span>Completed</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/profile/list/all" className="flex items-center gap-3 pl-8 py-2 text-base">
                            <ListChecks className="h-4 w-4" />
                            <span>All Books</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile/reviews" className="flex items-center gap-3 px-3 py-2 text-base font-normal">
                    <MessageSquareText className="h-5 w-5" />
                    <span>My Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile/settings" className="flex items-center gap-3 px-3 py-2 text-base font-normal">
                    <Settings2 className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        <Copyright className="h-4 w-4" />
        <span>Yash Midha</span>
      </div>
    </Sidebar>
  )
}

export default ProfileSidebar
