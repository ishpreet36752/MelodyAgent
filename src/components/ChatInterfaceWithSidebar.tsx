import React, { useState } from "react";
import { ChatInterface } from "./ChatInterface";
import { ChatSidebar } from "./ChatSidebar";
import { SidebarProvider } from "./ui/sidebar";


export const ChatInterfaceWithSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="min-h-screen flex bg-gradient-to-r bg-black/90">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          
            <ChatSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with sidebar trigger
          <div className="flex items-center gap-2 p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
            
            <h1 className="text-lg font-semibold text-white">Moodly</h1>
          </div> */}
          
          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}; 