"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus } from "lucide-react";

type Props = {
  open: boolean;
  abrirNuevoCliente: () => void;
  cerrarDialog: () => void;

  tituloModal: string;
  children?: React.ReactNode;
};

export function CreateClientModal({
  open,
  abrirNuevoCliente,
  cerrarDialog,
  tituloModal,
  children,
}: Props) {
  // console.log("CreateClientModal");
  // console.log(children);
  return (
    <Dialog open={open}>
      <Button
        style={{ textShadow: `0 4px 8px hsl(var(--accent))` }}
        className="fixed bottom-4 right-4 z-50 bg-accent rounded-4xl py-6"
        onClick={abrirNuevoCliente}
      >
        <Plus className="h-10 w-10" />{" "}
        <span className="text-lg">Nuevo Cliente</span>
      </Button>

      <DialogContent
        className="rounded-none flex flex-col h-full min-w-screen min-h-0"
        showCloseButton={false}
      >
        <DialogHeader>
          <div className="grid grid-cols-3 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="justify-self-start"
              onClick={cerrarDialog}
            >
              <ArrowLeft className="h-10 w-10" />
            </Button>
            <DialogTitle className="text-center col-start-2">
              {tituloModal}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Formulario para crear o editar cliente
            </DialogDescription>
            <div></div>
          </div>
          <div className="-mt-4 p-0">
            <hr className="border-t border-border my-4" />
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
