import * as z from "zod";

const phoneRegexWithOne =
  /^(1[-.\s]?)?\(?(809|829|849)\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const ClienteSchema = z.object({
  id: z.coerce
    .number()
    .nullish()
    .transform((val) => (!val ? undefined : val)),

  nombre: z.string().min(1, "Campo obligatorio"),

  rnc: z.coerce
    .string()
    .min(1, "Campo obligatorio")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 9 || digits.length === 11;
    }, "Debe ser un RNC (9 dígitos) o cédula (11 dígitos)"),

  direccion: z
    .string()
    .nullish()
    .transform((val) => (!val ? null : val)),

  ciudadId: z.coerce
    .number()
    .nullish()
    .transform((val) => (!val ? null : val)),

  correo: z
    .union([z.email("Correo inválido"), z.literal("")])
    .nullish()
    .transform((val) => (val === "" ? null : val)),

  telefono: z.coerce
    .string()
    .regex(phoneRegexWithOne, "Teléfono inválido")
    .nullish()
    .transform((val) => (!val ? null : val)),
});

export type ClienteInput = z.input<typeof ClienteSchema>;
export type ClienteOutput = z.output<typeof ClienteSchema>;

export type MiniCiudad = {
  id: number;

  nombre: string;
};
export type Provincia = {
  id: number;

  nombre: string;

  ciudades: MiniCiudad[];
};

export type Cliente = {
  id: number;

  nombre: string;

  rnc: string;

  direccion: string;

  ciudad: Ciudad;

  correo: string;

  telefono: string;
};

export type Ciudad = {
  id: number;

  nombre: string;

  provincia: string;
};
