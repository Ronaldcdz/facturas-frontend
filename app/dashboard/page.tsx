import { LayoutDashboard } from "lucide-react";
import MobilePageView from "./_components/MobilePageView";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-primarysecondary">
      <div className="p-8">
        <div className="md:hidden">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <LayoutDashboard className="h-5 w-5" />
              <h1>Dashboard</h1>
            </div>
            <div className="ml-auto">
              <SidebarTrigger />
            </div>
          </div>

          <MobilePageView />
        </div>

        <div className="hidden md:block">{/* <DesktopAppSidebar /> */}</div>
      </div>
    </div>
  );
}
