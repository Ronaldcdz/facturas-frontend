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
import { Hash, Mail, MapPin, Phone, User, Map, Loader2, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {

  useForm,
  useController,
  Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClienteInput, ClienteOutput, ClienteSchema, Provincia } from "./schema";
import { startTransition, useActionState, useEffect } from "react";
import { ActionState, createCliente } from "@/app/actions/clientes";
import { flattenErrors, objectToFormData } from "@/lib/utils";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Props = {
  provincias: Provincia[]
}

export function CreateClientForm({ provincias }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ClienteInput, undefined, ClienteOutput>({
    resolver: zodResolver(ClienteSchema),
  });

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(createCliente, null)

  useEffect(() => {
    if (!state) return;
    console.log("Devolvió algo??")
    console.log(state)

    if (state.success) {
      toast(state.message, { position: 'top-center' })
    }

  }, [state])


  const onSubmit = async (data: ClienteOutput) => {
    console.log("formularios", data);
    startTransition(() => {
      if (isPending) return;

      const formData = objectToFormData<ClienteOutput>(data);
      formAction(formData);
    })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errores) => {
        console.log("Errores", errores);
      })}
      className="flex flex-col h-full min-h-0 gap-10"
    >
      {state?.errors && <ErrorAlert description={flattenErrors(state.errors)} />}
      <FieldGroup className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Field className="mb-2">
          <Label htmlFor="name">Nombre o Razón social</Label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Ej. Juan Perez"
              className="pl-8"
              {...register("nombre")}
            />
            <p className="text-sm text-red-500 mt-1 absolute">
              {errors.nombre?.message}
            </p>
          </div>
        </Field>
        <Field className="mb-2">
          <Label htmlFor="id">RNC/Cédula</Label>
          <div className="relative">
            <Hash className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <RncInput control={control} />
            <p className="text-sm text-red-500 mt-1 absolute">
              {errors.rnc?.message}
            </p>
          </div>
        </Field>
        <div className="flex flex-row gap-4">
          <Field className="mb-2">
            <Label htmlFor="phone">Teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <PhoneInput control={control} />
              <p className="text-sm text-red-500 mt-1 absolute">
                {errors.telefono?.message}
              </p>
            </div>
          </Field>
          <Field className="mb-2">
            <Label htmlFor="email">Correo</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@dominio.com"
                className="pl-8"
                {...register("correo")}
              />
              <p className="text-sm text-red-500 mt-1 absolute">
                {errors.correo?.message}
              </p>
            </div>
          </Field>
        </div>
        <Field className="mb-2">
          <Label htmlFor="city">Ciudad</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <SelectInput control={control} provincias={provincias} />
            <p className="text-sm text-red-500 mt-1 absolute">
              {errors.ciudadId?.message}
            </p>
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
              {...register("direccion")}
            />
            <p className="text-sm text-red-500 mt-1 absolute">
              {errors.direccion?.message}
            </p>
          </div>
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

function PhoneInput({ control }: { control: Control<ClienteInput> }) {
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return digits;
    const parts = [match[1], match[2], match[3]].filter(Boolean);
    return parts.length > 1 ? parts.join("-") : parts[0] || "";
  };

  const {
    field: { value, onChange, onBlur, ref },
  } = useController<ClienteInput, "telefono">({
    name: "telefono",
    control,
  });

  const displayValue = formatPhone(String(value ?? ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange(rawDigits);
  };

  return (
    <Input
      id="phone"
      type="tel"
      placeholder="829-708-0566"
      className="pl-8"
      value={displayValue}
      onChange={handleChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
}

function RncInput({ control }: { control: Control<ClienteInput> }) {
  const formatDocument = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 11); // máximo 11 dígitos
    const len = digits.length;

    if (len <= 9) {
      // Formato RNC: 1-XX-XXXXX-X
      const match = digits.match(/^(\d{1})(\d{0,2})(\d{0,5})(\d{0,1})$/);
      if (!match) return digits;
      const parts = [match[1], match[2], match[3], match[4]].filter(Boolean);
      return parts.join("-");
    } else {
      // Formato cédula: XXX-XXXXXXX-X
      const match = digits.match(/^(\d{1,3})(\d{0,7})(\d{0,1})$/);
      if (!match) return digits;
      const parts = [match[1], match[2], match[3]].filter(Boolean);
      return parts.join("-");
    }
  };

  const {
    field: { value, onChange, onBlur, ref },
  } = useController<ClienteInput, "rnc">({
    name: "rnc",
    control,
  });

  const displayValue = formatDocument(String(value ?? ""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, "").slice(0, 11);
    onChange(rawDigits);
  };

  return (
    <Input
      id="rnc"
      type="text"
      placeholder="RNC: 1-23-45678-9 / Cédula: 001-1234567-8"
      className="pl-8"
      value={displayValue}
      onChange={handleChange}
      onBlur={onBlur}
      ref={ref}
    />
  );
}

function SelectInput({ control, provincias }: { control: Control<ClienteInput>, provincias: Provincia[] }) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name: "ciudadId",
    control,
  });

  // value puede ser número o null; Select espera string
  const stringValue = value?.toString() ?? "";

  return (
    <Select
      value={stringValue}
      onValueChange={(val: string) => {
        console.log("que valor es este", val);
        onChange(val);
      }} // pasa string, Zod transforma
      onOpenChange={onBlur} // maneja blur

    >
      <SelectTrigger ref={ref} className="w-full pl-8" id="city">
        <SelectValue placeholder="Seleccionar Ciudad" />
      </SelectTrigger>
      <SelectContent>
        {
          provincias.map(provincia => (
            <SelectGroup key={provincia.id}>
              <SelectLabel>{provincia.nombre}</SelectLabel>
              {provincia.ciudades.map(ciudad => (
                <SelectItem key={ciudad.id} value={ciudad.id.toString()}>
                  {ciudad.nombre}
                </SelectItem>
              ))}
            </SelectGroup>
          ))
        }
      </SelectContent>
    </Select>
  );
}


type ErrorAlertProps = {
  description: string | string[];
}
export function ErrorAlert({ description }: ErrorAlertProps) {
  const isArray = Array.isArray(description);

  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Ocurrió un error</AlertTitle>
      <AlertDescription>
        {isArray ? (
          <ul className="list-disc pl-4 space-y-1">
            {description.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        ) : (
          <span>{description}</span>
        )}
      </AlertDescription>
    </Alert>
  );
}
