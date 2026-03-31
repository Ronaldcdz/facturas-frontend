import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convierte un objeto genérico en una instancia de FormData.
 * - Los valores primitivos se convierten a string.
 * - Los objetos se serializan con JSON.stringify.
 * - Los arrays se añaden elemento por elemento con la misma clave.
 * - Los archivos (File / Blob) se añaden directamente.
 * - Se omiten valores `null` o `undefined`.
 *
 * @param data - Objeto a convertir.
 * @returns Instancia de FormData con los datos transformados.
 *
 * @example
 * const data: ClienteOutput = {
 *   nombre: "Juan",
 *   edad: 30,
 *   telefonos: ["123", "456"],
 *   direccion: { calle: "Av. Siempreviva", numero: 742 },
 *   avatar: fileObject
 * };
 *
 * const formData = transformDataToFormData<ClienteOutput>(data);
 */
export function objectToFormData<T extends Record<string, unknown>>(
  data: T
): FormData {
  const formData = new FormData();

  const appendValue = (key: string, value: unknown) => {
    // if (value === null || value === undefined) return;

    // 1. Archivos (File / Blob) - NestJS los recibe via @UploadedFile()
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    }
    // 2. Fechas - NestJS las parsea mejor en formato ISO
    else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    }
    // 3. Arrays - NestJS/Multer agrupa las claves repetidas en un array
    else if (Array.isArray(value)) {
      value.forEach((item) => appendValue(key, item));
    }
    // 4. Objetos - Se envían como JSON string
    else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    }
    // 5. Primitivos (boolean, number, string)
    else {
      formData.append(key, String(value));
    }
  };

  Object.entries(data).forEach(([key, value]) => {
    appendValue(key, value);
  });

  return formData;
}
/**
 * Convierte un FormData en un objeto plano en una sola pasada.
 */
export function formDataToObject<T extends Record<string, unknown>>(formData: FormData): T {
  const result = {} as Record<string, unknown>;

  for (const [key, value] of formData.entries()) {
    const parsedValue = parseValue(value);

    // Si la clave ya existe, manejamos el array
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const existing = result[key];
      if (Array.isArray(existing)) {
        existing.push(parsedValue);
      } else {
        result[key] = [existing, parsedValue];
      }
    } else {
      // Primera vez que vemos esta clave
      result[key] = parsedValue;
    }
  }

  return result as T;
}

/**
 * Intenta parsear valores. Maneja JSON (objetos/arrays) y tipos primitivos.
 */
function parseValue(value: FormDataEntryValue): unknown {
  // Si no es un string (es un File o Blob), lo devolvemos tal cual
  if (!(value instanceof String) && typeof value !== 'string') {
    return value;
  }

  const strValue = String(value);

  // Intentamos parsear solo si parece JSON o un booleano/número
  try {
    const parsed = JSON.parse(strValue);

    // Si el resultado es un objeto, array, booleano o número, lo devolvemos convertido
    if (typeof parsed === 'object' || typeof parsed === 'boolean' || typeof parsed === 'number') {
      return parsed;
    }
  } catch {
    // Si falla el parseo, es un string normal
  }

  return strValue;
}

/**
 * Tipo para los errores que pueden venir del servidor.
 * Puede ser un array de strings (errores generales) o un objeto
 * con claves (nombres de campo o '_form') cuyos valores son arrays de strings.
 */
type ServerErrors =
  | string[]
  | Record<string, string[]>
  | null
  | undefined;

import { ZodIssue } from "zod";

/**
 * Convierte cualquier estructura de errores en un array de strings.
 * Maneja ZodIssue[], errores manuales { _form: string[] } y nulos.
 */
export function flattenErrors(
  errors: ZodIssue[] | { [key: string]: string[] | undefined } | null | undefined
): string[] {
  // 1. Si no hay errores, retornamos array vacío
  if (!errors) return [];

  // 2. Si es un array, procesamos cada elemento
  if (Array.isArray(errors)) {
    return errors.map((error) => {
      // Si el elemento es un objeto (ZodIssue), extraemos el mensaje
      if (typeof error === "object" && "message" in error) {
        return error.message;
      }
      // Si ya es un string (error simple), lo devolvemos
      return String(error);
    });
  }

  // 3. Si es un objeto { _form: [...], campo: [...] }, aplanamos sus valores
  return Object.values(errors)
    .filter((val): val is string[] => Array.isArray(val))
    .flat();
}


export function formatDocument(value: string): string {
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

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return digits;
  const parts = [match[1], match[2], match[3]].filter(Boolean);
  return parts.length > 1 ? parts.join("-") : parts[0] || "";
};
