import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileClock, Ticket, TrendingUp } from "lucide-react";
import InvoiceCard from "./InvoiceCard";

export default function MobilePageView() {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <Card className="bg-primary shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl">TOTAL COBRADO</CardTitle>
            <CardContent className="text-4xl text-white">
              <p>RD$ XXXXXXXXX</p>
              <div className="rounded-2xl bg-[#488cb9] flex gap-2 p-2 mt-6 max-w-fit opacity-90 px-4">
                <TrendingUp />
                <p className="text-sm">+12% que el mes pasado</p>
              </div>
            </CardContent>
          </CardHeader>
        </Card>

        <Card className="flex flex-row gap-4 px-6 items-center">
          <div className="bg-[#F97316]/10 flex justify-center items-center p-4 rounded-[8px]">
            <FileClock color="#F97316" className="h-8 w-8" />
          </div>
          <CardHeader className="w-full px-0">
            <CardTitle className="opacity-50 text-lg">TOTAL COBRADO</CardTitle>
            <CardContent className="text-2xl">RD$ XXXXXXXXX</CardContent>
          </CardHeader>
        </Card>

        <Card className="flex flex-row gap-4 px-6 items-center">
          <div className="bg-[#1A6FA8]/10 flex justify-center items-center p-4 rounded-[8px]">
            <Ticket color="#1A6FA8" className="h-8 w-8" />
          </div>
          <CardHeader className="w-full px-0">
            <CardTitle className="opacity-50 text-lg">
              Número de secuencias disponibles (NCF)
            </CardTitle>
            <CardContent className="text-2xl">
              <span className="font-bold">20</span> restantes
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div
        className="
        flex flex-col gap-8 mt-6"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Últimas facturas</h2>
          <Button variant="link" className="text-xl">
            Ver todas
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <InvoiceCard />
          <InvoiceCard
            variant="pendiente"
            cliente="Global Tech Solutios"
            numeroNcf="B1500000122"
            fecha="Ago 28, 2025"
            monto="RD$ 10,500.00"
          />
        </div>
      </div>
    </div>
  );
}
