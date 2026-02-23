import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  cliente?: string;
  numeroNcf?: string;
  estadoPago?: string;
  monto?: string;
  fecha?: string;
  variant?: "pagado" | "pendiente";
};
export default function InvoiceCard({
  cliente = "Acme Corp L.T.D.",
  numeroNcf = "B1500000123",
  estadoPago = "pagado",
  monto = "RD$ 5,250.00",
  fecha = "Oct 22, 2025",
  variant = "pagado",
}: Props) {
  return (
    <Card className="flex flex-row gap-4 px-6 items-center">
      <CardHeader className="w-full px-0">
        <CardTitle className="flex justify-between text-lg">
          <p>{cliente}</p>
          {variant == "pagado" ? (
            <div className="rounded-2xl bg-[#22C55E]/10 py-2 px-4">
              <p className="text-sm text-[#22C55E]">
                {estadoPago.toUpperCase()}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#F59E0B]/10 py-2 px-4">
              <p className="text-sm text-[#F59E0B]">PENDIENTE</p>
            </div>
          )}
        </CardTitle>
        <CardDescription className="opacity-50 -mt-4">
          NCF: {numeroNcf}
        </CardDescription>
        <CardContent className="text-2xl flex justify-between">
          <p className="font-bold text-primary">{monto}</p>
          <p className="text-sm self-end">{fecha}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
