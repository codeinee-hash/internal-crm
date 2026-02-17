import { User } from "lucide-react";
import { SidebarTrigger } from "@/shared/ui/sidebar";

export function TopHeader() {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-10 text-slate-950">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <SidebarTrigger className="text-slate-950 hover:bg-slate-100" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium leading-tight">Admin panel</span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Manage credit limit requests and history
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <span>
            You are in <span className="text-sky-600 font-medium">admin</span>{" "}
            mode
          </span>
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
