import {
  LayoutDashboard,
  FileText,
  Users,
  Wrench,
  Settings,
  Wallet,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import type { LucideIcon } from "lucide-react";
import ClientLink from "../shared/ClientLink";

type Page = {
  title: string;
  icon: LucideIcon;
  href: string;
};
const ROUTES: Page[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Facturas",
    icon: FileText,
    href: "/invoices",
  },
  {
    title: "Clientes",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Servicios",
    icon: Wrench,
    href: "/services",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/settings",
  },
];
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="md:hidden">
        <header className="flex justify-between px-4 py-2 ">
          <h1>Billing App</h1>
          <SidebarTrigger />
        </header>
      </div>

      <Sidebar>
        <SidebarHeader className="px-3 pt-4">
          <div className="flex gap-4">
            <Wallet className="self-center h-10 w-10" />
            <div className="flex flex-col">
              <h3 className="text-2xl">Billing App</h3>
              <p>Manage bills</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 ">
          <SidebarGroup className="flex-1">
            {ROUTES.map(({ title, href, icon: Icon }) => (
              <ClientLink key={title} href={href}>
                <Icon className="h-6 w-6 self-center" />
                <span className="text-xl">{title}</span>
              </ClientLink>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 pb-4 pt-0">
          <hr className="border-t border-border my-4" />
          <div className="flex gap-4">
            <div className="h-10 w-10 self-center rounded-full bg-secondary flex items-center justify-center">
              <User className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl">User name</h3>
              <p className="opacity-25">User role</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      {children}
    </div>
  );
}
