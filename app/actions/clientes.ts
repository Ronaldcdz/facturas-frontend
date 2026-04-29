"use server";

import { ClienteSchema } from "@/components/features/clientes/schema";
import { formDataToObject } from "@/lib/utils";
import z from "zod";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: z.ZodIssue[] };

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: z.ZodIssue[] | { _form: string[] };
} | null;

const url = "https://facturas-backend-cuyf.onrender.com";

export async function createCliente(
  prevState: ActionState,
  formData: FormData,
) {
  const validation = validateFormData(ClienteSchema, formData);
  if (!validation.success) return validation;

  const cliente = validation.data;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });

    if (!res.ok) {
      return await handleApiError(res, "Error al actualizar cliente");
    }

    return { success: true, message: "Cliente creado con éxito" };
  } catch (error) {
    return {
      success: false,
      errors: { _form: ["Error de conexión", String(error)] },
    };
  }
}

export async function updateCliente(
  prevState: ActionState,
  formData: FormData,
) {
  const validation = validateFormData(ClienteSchema, formData);
  if (!validation.success) return validation;

  const cliente = validation.data;

  try {
    const res = await fetch(`${url}/${cliente.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    console.log("respuesta del servidor", res);
    if (!res.ok) {
      return await handleApiError(res, "Error al actualizar cliente");
    }
    const data = await res.json();
    return { success: true, message: "Cliente editado con éxito", data };
  } catch (error) {
    return {
      success: false,
      errors: { _form: ["Error de conexión"] },
    };
  }
}
function validateFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): ValidationResult<z.infer<T>> {
  const rawData = formDataToObject(formData);
  const result = schema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.issues };
  }

  return { success: true, data: result.data };
}

async function handleApiError(
  response: Response,
  fallbackMessage = "Error al procesar la solicitud",
): Promise<{ success: false; errors: { _form: string[] } }> {
  let errorMessages: string[] = [];

  try {
    const errorData = await response.json();
    console.log("errores");
    console.log(errorData);
    // Extrae mensajes según la estructura típica de tu API
    if (errorData.message) {
      errorMessages = Array.isArray(errorData.message)
        ? errorData.message
        : [errorData.message];
    } else if (errorData.error) {
      errorMessages = [errorData.error];
    } else {
      errorMessages = [fallbackMessage];
    }
  } catch (parseError) {
    // Si no es JSON válido, usa el texto de estado o el mensaje por defecto
    errorMessages = [response.statusText || fallbackMessage];
  }

  return {
    success: false,
    errors: { _form: errorMessages },
  };
}
