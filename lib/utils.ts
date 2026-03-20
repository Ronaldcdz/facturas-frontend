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

/**
 * Convierte cualquier estructura de errores en un array de strings.
 * - Si `errors` es null/undefined, retorna [].
 * - Si es un array, lo retorna directamente.
 * - Si es un objeto, aplana todos los valores (que se asumen arrays) en un solo array.
 *
 * @param errors - Errores provenientes del server action.
 * @returns Array de strings con todos los mensajes de error.
 *
 * @example
 * flattenErrors({ _form: ['Error de conexión'], email: ['Email inválido'] })
 * // => ['Error de conexión', 'Email inválido']
 */
export function flattenErrors(errors: ServerErrors): string[] {
  if (!errors) return [];
  if (Array.isArray(errors)) return errors;
  return Object.values(errors).flat();
}
