import type { Metadata } from "next";
import { Users, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ClientCard from "./_components/ClientCard";
import { CreateClientModal } from "@/components/features/clientes/CreateClientModal";
import { Cliente, Provincia } from "@/components/features/clientes/schema";
import { Button } from "@/components/ui/button";
import ClientWrapper from "./_components/ClientWrapper";
export const metadata: Metadata = {
  title: "Clientes",
};

// Objeto fallback para un solo Cliente
const fallbackCliente: Cliente = {
  id: 0,
  nombre: "Error al cargar",
  rnc: "N/A",
  direccion: "No disponible",
  ciudad: {
    id: 0,
    nombre: "Error",
    provincia: "Error",
  },
  correo: "error@ejemplo.com",
  telefono: "000-000-0000",
};

async function getAllClientes(): Promise<Cliente[]> {
  try {
    const response = await fetch("http://localhost:3000/clientes", {
      // next: { revalidate: 3600 } // opcional: caché en Next.js
    });

    if (!response.ok) {
      return [fallbackCliente];
    }

    const clientes: Cliente[] = await response.json();
    // console.log("clientes", clientes);
    return clientes;
  } catch (error) {
    console.error("Error fetching provincias:", error);
    return [fallbackCliente];
  }
}

async function getAllProvincias(): Promise<Provincia[]> {
  try {
    const response = await fetch("http://localhost:3000/provincias", {
      // next: { revalidate: 3600 } // opcional: caché en Next.js
    });

    if (!response.ok) {
      // Podrías lanzar un error o retornar un array con el placeholder
      // En este caso retornamos un placeholder para mantener UI consistente
      return [
        {
          id: 0,
          nombre: "Error",
          ciudades: [{ id: 0, nombre: "Error" }],
        },
      ];
    }

    const provincias: Provincia[] = await response.json();

    // Ordenar alfabéticamente por nombre (case-insensitive)
    return provincias.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }),
    );
  } catch (error) {
    console.error("Error fetching provincias:", error);
    // Fallback en caso de error de red
    return [
      {
        id: 0,
        nombre: "Error",
        ciudades: [{ id: 0, nombre: "Error" }],
      },
    ];
  }
}

export default async function page() {
  const clientes: Cliente[] = await getAllClientes();
  const provincias: Provincia[] = await getAllProvincias();
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
      <ClientWrapper clientes={clientes} provincias={provincias} />
      {/* <div className="flex flex-col gap-4 mt-4 px-4 py-2 "> */}
      {/*   {clientes.map(cliente => ( */}
      {/*     <ClientCard key={cliente.id} cliente={cliente} /> */}
      {/*   ))} */}
      {/* </div> */}
      {/* <CreateClientModal> */}
      {/*   <Button */}
      {/*     style={{ textShadow: `0 4px 8px hsl(var(--accent))` }} */}
      {/*     className="fixed bottom-4 right-4 z-50 bg-accent rounded-4xl py-6" */}
      {/*   > */}
      {/*     <Plus className="h-10 w-10" />{" "} */}
      {/*     <span className="text-lg">Nuevo Cliente</span> */}
      {/*   </Button> */}
      {/* </CreateClientModal> */}
    </div>
  );
}
