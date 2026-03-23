"use server";

import { ClienteSchema } from "@/components/features/clientes/schema";
import { formDataToObject } from "@/lib/utils";
import z from "zod";

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: z.ZodIssue[] | { _form: string[] };
} | null;

const url = 'http://localhost:3000/clientes';

export async function createCliente(prevState: ActionState, formData: FormData) {
  console.log("createCliente")
  console.log(typeof formData);
  console.log(formData);
  const rawData = formDataToObject(formData);

  const result = ClienteSchema.safeParse(rawData);
  console.log("que tenemos por aquí")
  console.log(rawData);
  console.log(result);

  console.log(rawData, result);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues
    };
  }
  const cliente = result.data;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    console.log("resultado del endpoint")
    console.log(res)
    if (!res.ok) {
      return {
        success: false,
        errors: { _form: ['Error al crear el cliente'] }
      };
    }

    return { success: true, message: 'Cliente creado con éxito' };
  } catch (error) {
    return {
      success: false,
      errors: { _form: ['Error de conexión'] }
    };
  }
}
