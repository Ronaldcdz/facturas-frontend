"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, Mail, MapPin, Phone, User, Map } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CreateClientForm() {
  return (
    <FieldGroup className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Field>
        <Label htmlFor="name-1">Nombre o Razón social</Label>
        <div className="relative">
          <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name-1"
            name="name"
            placeholder="Ej. Juan Perez"
            className="pl-8"
          />
        </div>
      </Field>
      <Field>
        <Label htmlFor="id-1">RNC/Cédula</Label>
        <div className="relative">
          <Hash className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="id-1"
            name="id"
            placeholder="1-01-XXXXX-X"
            className="pl-8"
          />
        </div>
      </Field>
      <div className="flex flex-row gap-4">
        <Field>
          <Label htmlFor="phone-1">Teléfono</Label>
          <div className="relative">
            <Phone className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone-1"
              type="tel"
              name="phone"
              placeholder="829-708-0566"
              className="pl-8"
            />
          </div>
        </Field>
        <Field>
          <Label htmlFor="email-1">Correo</Label>
          <div className="relative">
            <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email-1"
              type="email"
              name="email"
              placeholder="tucorreo@dominio.com"
              className="pl-8"
            />
          </div>
        </Field>
      </div>
      <Field>
        <Label htmlFor="city-1">Ciudad</Label>
        <div className="relative">
          <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Select>
            <SelectTrigger className="w-full pl-8" id="city-1" name="city">
              <SelectValue placeholder="Seleccionar Ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ciudades</SelectLabel>
                <SelectItem value="santo-domingo">Santo Domingo</SelectItem>
                <SelectItem value="santiago">Santiago</SelectItem>
                <SelectItem value="la-romana">La Romana</SelectItem>
                <SelectItem value="puerto-plata">Puerto Plata</SelectItem>
                <SelectItem value="sfm">San Francisco de Macorís</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Field>
      <Field>
        <FieldLabel htmlFor="direction">Dirección</FieldLabel>
        <div className="relative">
          <Map className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="direction"
            placeholder="Calle, Número, Sector..."
            className="pl-8 resize-none"
            rows={4}
          />
        </div>
      </Field>
    </FieldGroup>
  );
}
