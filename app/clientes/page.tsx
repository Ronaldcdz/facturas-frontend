import type { Metadata } from "next";
import { Users, Bell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ClientCard from "./_components/ClientCard";
import { CreateClientModal } from "@/components/features/clientes/CreateClientModal";
export const metadata: Metadata = {
  title: "Clientes",
};

export default function page() {
  return (
    <div className="md:hidden">
      <div className="bg-white flex flex-col gap-4 px-4 py-2 pt-4">
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <Users className="h-5 w-5 self-center" />
            <h1 className="text-2xl">Clientes</h1>
          </div>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar por nombre o RNC"
            className="pl-8 bg-[#F1F5F9]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 px-4 py-2 ">
        <ClientCard />
        <ClientCard />
        <ClientCard />
      </div>
      <CreateClientModal />
    </div>
  );
}
