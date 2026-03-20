import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus } from "lucide-react";
import { CreateClientForm } from "./CreateClienteForm";
import { Provincia } from "./schema";

async function getAllProvincias(): Promise<Provincia[]> {
  try {
    const response = await fetch('http://localhost:3000/provincias', {
      // next: { revalidate: 3600 } // opcional: caché en Next.js
    });

    if (!response.ok) {
      // Podrías lanzar un error o retornar un array con el placeholder
      // En este caso retornamos un placeholder para mantener UI consistente
      return [{
        id: 0,
        nombre: 'Error',
        ciudades: [{ id: 0, nombre: 'Error' }]
      }];
    }

    const provincias: Provincia[] = await response.json();

    // Ordenar alfabéticamente por nombre (case-insensitive)
    return provincias.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );
  } catch (error) {
    console.error('Error fetching provincias:', error);
    // Fallback en caso de error de red
    return [{
      id: 0,
      nombre: 'Error',
      ciudades: [{ id: 0, nombre: 'Error' }]
    }];
  }
}
export async function CreateClientModal() {

  const provincias: Provincia[] = await getAllProvincias();

  return (
    <Dialog>
      <DialogTrigger asChild className="fixed bottom-4 right-4 z-50">
        <Button
          style={{ textShadow: `0 4px 8px hsl(var(--accent))` }}
          className="bg-accent rounded-4xl py-6"
        >
          <Plus className="h-10 w-10" />{" "}
          <span className="text-lg">Nuevo Cliente</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="rounded-none flex flex-col h-full min-w-screen min-h-0"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="grid grid-cols-3 items-center">
            <Button variant="ghost" size="icon" className="justify-self-start">
              <ArrowLeft className="h-10 w-10" />
            </Button>
            <DialogTitle className="text-center col-start-2">
              Crear Cliente
            </DialogTitle>
            <div></div>
          </div>
          <div className="-mt-4 p-0">
            <hr className="border-t border-border my-4" />
          </div>
        </DialogHeader>
        <CreateClientForm provincias={provincias} />
      </DialogContent>
    </Dialog>
  );
}
