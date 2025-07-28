import React from "react";
import { Home, Music, Heart, Search, Settings, User, LogOut, MessageCircle, Headphones, Radio } from "lucide-react";
import {
  SidebarTrigger,
  useSidebar
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
  const { isOpen } = useSidebar();
  
  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    window.location.href = "/";
  };

  return (
    <div className={`transition-all duration-300 ease-in-out h-full bg-transparent ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <SidebarTrigger className="h-8 w-8 p-1 rounded-md hover:bg-white/10 transition-colors text-black" />
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Music className="w-4 h-4 text-black" />
          </div>
          <span className={`font-semibold text-lg text-black transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Moodly
          </span>
        </div>
        
        {/* Navigation */}
        <div className="flex-1">
          <div className={`text-black/70 text-xs font-semibold mb-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Navigation
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a 
                key={item.title}
                href={item.url} 
                className="flex items-center gap-3 text-black/80 hover:text-black hover:bg-white/10 transition-all duration-300 rounded-md p-2"
                title={!isOpen ? item.title : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-auto">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 text-red-600 hover:text-red-600 hover:bg-transparent transition-all duration-300 rounded-md p-2 w-full"
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 