"use client"

import { FileText, Upload, History, Settings, Home, LogOut, Clock, FileCheck } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface AppSidebarProps {
  onNavigate?: (page: string) => void
  currentPage?: string
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    page: "dashboard",
  },
  {
    title: "Upload Meeting",
    icon: Upload,
    page: "upload",
  },
  {
    title: "Meeting History",
    icon: History,
    page: "history",
  },
  {
    title: "Summaries",
    icon: FileText,
    page: "summaries",
  },
  {
    title: "Settings",
    icon: Settings,
    page: "settings",
  },
]

export function AppSidebar({ onNavigate, currentPage = "dashboard" }: AppSidebarProps) {
  const router = useRouter()
  const userStats = {
    minutesProcessed: 5370, // 89.5 hours * 60 minutes
    totalSummaries: 127,
    userName: "John Smith",
    userEmail: "john.smith@company.com",
  }

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("Signing out...")
    // Redirect to sign in page
    router.push("/")
  }

  return (
    <Sidebar className="sidebar-container">
      <SidebarHeader className="p-6 sidebar-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 extra-smooth">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg text-gray-800">Recapify</h1>
            <p className="text-sm text-blue-600 font-medium">AI-Powered</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold sidebar-fade-in">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="sidebar-menu-item menu-item-entrance"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <SidebarMenuButton
                    onClick={() => onNavigate?.(item.page)}
                    isActive={currentPage === item.page}
                    className={
                      currentPage === item.page
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold shadow-md extra-smooth"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 font-medium extra-smooth hover:shadow-sm sidebar-menu-item"
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 sidebar-fade-in" style={{ animationDelay: "0.8s" }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700 hover:bg-blue-50 extra-smooth hover:shadow-sm hover-lift"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg" alt={userStats.userName} />
                    <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {userStats.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-gray-800">{userStats.userName}</span>
                    <span className="truncate text-xs text-blue-600">{userStats.userEmail}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/placeholder.svg" alt={userStats.userName} />
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {userStats.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-gray-800">{userStats.userName}</span>
                      <span className="truncate text-xs text-blue-600">{userStats.userEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* User Statistics */}
                <div className="px-2 py-2">
                  <div className="text-xs font-medium text-gray-600 mb-2">Your Statistics</div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-emerald-50 extra-smooth hover:shadow-sm">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-emerald-700">
                          {userStats.minutesProcessed.toLocaleString()} minutes
                        </div>
                        <div className="text-xs text-emerald-600">Time processed</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-blue-50 extra-smooth hover:shadow-sm">
                      <FileCheck className="w-4 h-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-700">{userStats.totalSummaries}</div>
                        <div className="text-xs text-blue-600">Summaries created</div>
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onNavigate?.("settings")}
                  className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium extra-smooth"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 font-medium extra-smooth"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
