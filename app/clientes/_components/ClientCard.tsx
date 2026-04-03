import { Cliente } from "@/components/features/clientes/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDocument } from "@/lib/utils";
import { MapPin, Ticket } from "lucide-react";
import ClientCardActions from "./ClientCardActions";
import { ReactNode } from "react";

type Props = {
  cliente: Cliente;
  children?: ReactNode
};

export default function ClientCard({
  cliente, children }: Props) {

  const direccion: string = cliente.ciudad && Object.keys(cliente.ciudad).length > 0
    ? `${cliente.ciudad.nombre}, ${cliente.ciudad.provincia}`
    : "N/A";

  return (
    <Card className="flex flex-row justify-between gap-4 px-6 py-2 items-center bg-white">
      <div className="bg-[#1A6FA8]/10 flex justify-center items-center p-4 rounded-xl">
        <Ticket color="#1A6FA8" className="h-8 w-8" />
      </div>
      <CardHeader className="w-full px-0 flex">
        <CardTitle className="flex gap-1 flex-col self-center">
          <span className="text-xl">{cliente.nombre}</span>
          <span className="text-md opacity-50">RNC: {formatDocument(cliente.rnc)}</span>
          <span className="text-md opacity-50 flex gap-1">
            <span>
              <MapPin className="h-5 w-5" />
            </span>
            {direccion}
          </span>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 ml-auto">
          {/* <ClientCardActions cliente={cliente} /> */}
          {children}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
