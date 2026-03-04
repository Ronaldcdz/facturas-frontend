import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone, Ticket } from "lucide-react";

type Props = {
  cliente?: string;
  rnc?: string;
  provincia?: string;
};
export default function ClientCard({
  cliente = "Acme Corp L.T.D.",
  rnc = "1-01-82270-8",
  provincia = "Santiago",
}: Props) {
  return (
    <Card className="flex flex-row justify-between gap-4 px-6 py-2 items-center bg-white">
      <div className="bg-[#1A6FA8]/10 flex justify-center items-center p-4 rounded-[8px]">
        <Ticket color="#1A6FA8" className="h-8 w-8" />
      </div>
      <CardHeader className="w-full px-0 flex">
        <CardTitle className="flex gap-1 flex-col self-center">
          <span className="text-xl">{cliente}</span>
          <span className="text-md opacity-50">RNC: {rnc}</span>
          <span className="text-md opacity-50 flex gap-1">
            <span>
              <MapPin className="h-5 w-5" />
            </span>
            {provincia}
          </span>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 ml-auto">
          <div className="bg-[#1A6FA8]/10 flex justify-center items-center p-3 rounded-[8px]">
            <Phone color="#1A6FA8" className="h-5 w-5" />
          </div>
          <div className="bg-[#1A6FA8]/10 flex justify-center items-center p-3 rounded-[8px]">
            <Mail color="#1A6FA8" className="h-5 w-5" />
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
