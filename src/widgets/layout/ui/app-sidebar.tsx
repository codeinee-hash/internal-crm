import { FileText, History, Box } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/shared/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/shared/lib/tailwind-merge";

const items = [
  {
    title: "Requests",
    url: "/requests",
    icon: FileText,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-xl text-slate-950">
      <SidebarHeader className="h-16 flex items-center px-5 border-b border-slate-200">
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-200",
            isCollapsed ? "justify-center w-full px-0" : "",
          )}
        >
          <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shrink-0">
            <Box className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
                Internal CRM
              </span>
              <span className="text-slate-500 text-xs block truncate">
                Admin
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  onClick={() => navigate(item.url)}
                  className={cn(
                    "hover:bg-slate-100 hover:text-slate-900 transition-colors",
                    isActive &&
                      "bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800 font-medium",
                  )}
                >
                  <button className="w-full flex items-center gap-2 cursor-pointer">
                    <item.icon
                      className={cn(
                        "h-4 w-4",
                        isActive
                          ? "text-sky-700"
                          : "text-slate-500 group-hover:text-slate-900",
                      )}
                    />
                    <span>{item.title}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {!isCollapsed && (
        <SidebarFooter className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Internal CRM
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
