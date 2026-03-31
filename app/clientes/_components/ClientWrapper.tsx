"use client";

import { CreateClientModal } from "@/components/features/clientes/CreateClientModal";
import {
  Cliente,
  ClienteInput,
  Provincia,
} from "@/components/features/clientes/schema";
import { useState } from "react";
import { CreateClientForm } from "@/components/features/clientes/CreateClienteForm";
import { Button } from "@/components/ui/button";
import { Pencil, Mail } from "lucide-react";
import ClientCard from "./ClientCard";

type Props = {
  clientes: Cliente[];
  provincias: Provincia[];
};

const emptyValues: ClienteInput = {
  id: null,
  nombre: "",
  rnc: "",
  direccion: null,
  ciudadId: null,
  correo: null,
  telefono: null,
};

export default function ClientWrapper({ clientes, provincias }: Props) {
  const [clienteSelected, setClienteSelected] = useState<ClienteInput | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const seleccionarCliente = (cliente: Cliente) => {
    setClienteSelected(toClienteInput(cliente));
    setOpen(true);
  };

  const abrirNuevoCliente = () => {
    setClienteSelected(null);
    setOpen(true);
  };

  const cerrarDialog = () => {
    setOpen(false);
    setClienteSelected(null);
  };

  const isEditing = clienteSelected !== null;

  const tituloModal = isEditing ? "Editar cliente" : "Nuevo cliente";
  const tituloBoton = isEditing ? "Guardar cambios" : "Crear cliente";
  return (
    <>
      <div className="flex flex-col gap-4 mt-4 px-4 py-2 ">
        {clientes.map((cliente) => (
          <ClientCard key={cliente.id} cliente={cliente}>
            <Button
              className="bg-[#1A6FA8]/10 flex justify-center items-center p-3 rounded-xl"
              onClick={() => seleccionarCliente(cliente)}
            >
              <Pencil color="#1A6FA8" className="h-10 w-10" />
            </Button>
            <Button className="bg-[#1A6FA8]/10 flex justify-center items-center p-3 rounded-xl">
              <Mail color="#1A6FA8" className="h-10 w-10" />
            </Button>
          </ClientCard>
        ))}
      </div>
      <CreateClientModal
        open={open}
        abrirNuevoCliente={abrirNuevoCliente}
        tituloModal={tituloModal}
        cerrarDialog={cerrarDialog}
      >
        <CreateClientForm
          provincias={provincias}
          closeDialog={cerrarDialog}
          clienteDefaultValue={clienteSelected ?? emptyValues}
          tituloBoton={tituloBoton}
        />
      </CreateClientModal>
    </>
  );
}

function toClienteInput(cliente: Cliente): ClienteInput {
  return {
    id: cliente.id ?? null,
    nombre: cliente.nombre ?? null,
    rnc: cliente.rnc ?? "",
    direccion: cliente.direccion ?? null,
    ciudadId: cliente.ciudad?.id,
    correo: cliente.correo ?? null,
    telefono: cliente.telefono ?? null,
  };
}
