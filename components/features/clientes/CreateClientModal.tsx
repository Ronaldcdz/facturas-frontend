"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus } from "lucide-react";
import { CreateClientForm } from "./CreateClienteForm";

export function CreateClientModal() {
  return (
    <Dialog>
      <form>
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
          className="rounded-none flex flex-col h-full min-w-screen"
          showCloseButton={false}
        >
          <DialogHeader>
            <div className="grid grid-cols-3 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="justify-self-start"
              >
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
          <CreateClientForm />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
