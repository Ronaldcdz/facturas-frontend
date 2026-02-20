import { DesktopAppSidebar } from "./DesktopAppSidebar";
import { MobileAppSidebar } from "./MobileAppSidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <div className="md:hidden">
        <MobileAppSidebar />
      </div>

      <div className="hidden md:block">
        <DesktopAppSidebar />
      </div>
      {children}
    </div>
  );
}
