import { SidebarProvider } from "@/shared/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { TopHeader } from "./top-header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />

          <main className="flex-1 p-4 md:p-6 w-full max-w-6xl mx-auto overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
