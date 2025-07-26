import React from "react";
import { Home, Music, Heart, Search, Settings, User, LogOut, MessageCircle, Headphones, Radio,Menu  } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
// Menu items for the chat sidebar
const menuItems = [
  {
    title: "Chat Assistant",
    icon: MessageCircle,
    url: "/dashboard",
  },
  {
    title: "Search Music",
    icon: Search,
    url: "/search",
  },
  {
    title: "My Playlists",
    icon: Music,
    url: "/playlists",
  },
  {
    title: "Liked Songs",
    icon: Heart,
    url: "/liked",
  },
  {
    title: "Now Playing",
    icon: Headphones,
    url: "/now-playing",
  },
  {
    title: "Radio",
    icon: Radio,
    url: "/radio",
  },
  {
    title: "Profile",
    icon: User,
    url: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function ChatSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    window.location.href = "/";
  };

  return (
    <Sidebar className="h-full bg-gradient-to-b from-primary/10 to-primary/5 border-r border-primary/20">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
        <SidebarTrigger className="h-8 w-8 p-1 rounded-md hover:bg-white/10 transition-colors">
              <Menu className="w-4 h-4 text-white" />
            </SidebarTrigger>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg text-primary">MelodyAgent</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 text-primary/80 hover:text-primary hover:bg-primary/10">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
} 